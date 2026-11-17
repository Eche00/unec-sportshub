
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export interface PlayerInfo {
  uid: string;
  playerId: string;
  userId: string;
  fullName: string;
  userName: string;
  email: string | null;
  phone: string;
  profileImage: string | null;
  coverImage: string | null;
  gender: string | null;
  bio: string | null;
  role: string;
  status: string;
  universityId: string | null;
  facultyId: string | null;
  departmentId: string | null;
  classId: string | null;
  sports: string;
  position: string;
  shirtNumber: number;
  preferredFoot: string;
  statistics: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlayerFilters {
  facultyId?: string;
  departmentId?: string;
  classId?: string;
  sports?: string;
  gender?: string;
  status?: string;
  search?: string;
}

export interface PlayerInfoState {
  players: PlayerInfo[];
  filteredPlayers: PlayerInfo[];
  isLoading: boolean;
  error: string | null;
  filters: PlayerFilters;
  setFilters: React.Dispatch<React.SetStateAction<PlayerFilters>>;
  refresh: () => void;
}

const convertTimestamp = (value: unknown): Date | undefined => {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  return undefined;
};

export function usePlayerInfo(): PlayerInfoState {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PlayerFilters>({});
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let unsubscribePlayers: (() => void) | undefined;
    let isMounted = true;
    let requestId = 0;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribePlayers?.();
      unsubscribePlayers = undefined;

      if (!isMounted) return;

      setPlayers([]);
      setError(null);
      setIsLoading(true);

      if (!user) {
        setIsLoading(false);
        return;
      }

      const currentRequestId = ++requestId;
      const playersQuery = query(collection(db, "players"));

      unsubscribePlayers = onSnapshot(
        playersQuery,
        async (snapshot) => {
          if (!isMounted || currentRequestId !== requestId) return;

          try {
            const playerList: PlayerInfo[] = await Promise.all(
              snapshot.docs.map(async (playerDoc) => {
                const player = playerDoc.data();
                const userId = player.userId || playerDoc.id;

                // get normal account information from users
                const userSnap = await getDoc(doc(db, "users", userId));
                const userData = userSnap.exists() ? userSnap.data() : {};

                // combine user information with player information
                return {
                  uid: userId,
                  playerId: playerDoc.id,
                  userId,

                  fullName: userData.fullName || player.fullName || "Unknown Player",
                  userName: userData.userName || player.userName || "",
                  email: userData.email || player.email || null,
                  phone: userData.phone || player.phone || "",
                  profileImage: userData.profileImage || player.profileImage || null,
                  coverImage: userData.coverImage || player.coverImage || null,
                  gender: userData.gender || player.gender || null,
                  bio: userData.bio || player.bio || null,

                  role: userData.role || "player",
                  status: player.status || userData.status || "pending",

                  universityId: userData.universityId || player.universityId || null,
                  facultyId: userData.facultyId || player.facultyId || null,
                  departmentId: userData.departmentId || player.departmentId || null,
                  classId: userData.classId || player.classId || null,

                  sports: player.sports || "",
                  position: player.position || "",
                  shirtNumber: player.shirtNumber ?? 0,
                  preferredFoot: player.preferredFoot || "right",

                  statistics: player.statistics || {},

                  createdAt: convertTimestamp(player.createdAt || userData.createdAt),
                  updatedAt: convertTimestamp(player.updatedAt || userData.updatedAt),
                };
              })
            );

            if (!isMounted || currentRequestId !== requestId) return;

            setPlayers(playerList);
            setIsLoading(false);
            setError(null);
          } catch (err) {
            console.error("Players Fetch Error:", err);

            if (!isMounted || currentRequestId !== requestId) return;

            setError("Failed to load players.");
            setIsLoading(false);
          }
        },
        (err) => {
          console.error("Players Fetch Error:", err);

          if (!isMounted || currentRequestId !== requestId) return;

          setError("Failed to load players.");
          setIsLoading(false);
        }
      );
    });

    return () => {
      isMounted = false;
      requestId++;
      unsubscribeAuth();
      unsubscribePlayers?.();
    };
  }, [refreshKey]);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesFaculty =
        !filters.facultyId || player.facultyId === filters.facultyId;

      const matchesDepartment =
        !filters.departmentId || player.departmentId === filters.departmentId;

      const matchesClass =
        !filters.classId || player.classId === filters.classId;

      const matchesSport =
        !filters.sports ||
        player.sports.toLowerCase() === filters.sports.toLowerCase();

      const matchesGender =
        !filters.gender || player.gender === filters.gender;

      const matchesStatus =
        !filters.status || player.status === filters.status;

      const search = filters.search?.toLowerCase().trim() || "";

      const matchesSearch =
        !search ||
        player.fullName.toLowerCase().includes(search) ||
        player.userName.toLowerCase().includes(search) ||
        player.phone.toLowerCase().includes(search) ||
        player.position.toLowerCase().includes(search) ||
        player.sports.toLowerCase().includes(search);

      return (
        matchesFaculty &&
        matchesDepartment &&
        matchesClass &&
        matchesSport &&
        matchesGender &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [players, filters]);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return {
    players,
    filteredPlayers,
    isLoading,
    error,
    filters,
    setFilters,
    refresh,
  };
}
