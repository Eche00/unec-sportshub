"use client";

import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import {
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import Loader from "@/components/ui/Loader";

type User = {
    id: string;
    uid: string;
    fullName: string;
    email: string;
    role: string;
    secretCode: string;
    createdAt: string;
};

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const usersRef = collection(db, "users");

        const usersQuery = query(
            usersRef,
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            usersQuery,
            (snapshot) => {
                const usersData: User[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<User, "id">),
                }));

                setUsers(usersData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const filteredUsers = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) return users;

        return users.filter(
            (user) =>
                user.fullName?.toLowerCase().includes(value) ||
                user.email?.toLowerCase().includes(value) ||
                user.role?.toLowerCase().includes(value) ||
                user.uid?.toLowerCase().includes(value)
        );
    }, [users, search]);

    const isSearching = search.trim().length > 0;
    const hasUsers = filteredUsers.length > 0;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-6">

            {/* SEARCH BAR */}
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 outline-none ring-2 ring-[#FB831C] transition"
                />
            </div>

            {/* EMPTY STATE */}
            {!hasUsers ? (
                <div className="flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115] w-full mx-auto min-h-[300px]">

                    <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                        <PeopleOutlineIcon className="text-gray-300" />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-200 mb-1">
                        {isSearching
                            ? "No users found"
                            : "No users yet"}
                    </h3>

                    <p className="text-xs text-gray-400 mb-4 max-w-xs">
                        {isSearching
                            ? `No users match "${search}". Try a different keyword.`
                            : "No users have been created yet."}
                    </p>

                    {isSearching && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-xs text-[#FB831C] cursor-pointer"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            ) : (
                /* USERS TABLE */
                <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-[#0F1115]">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left">

                            {/* TABLE HEADER */}
                            <thead className="border-b border-gray-800 bg-[#15181D]">
                                <tr>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Role
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Secret Code
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Created
                                    </th>
                                </tr>
                            </thead>

                            {/* TABLE BODY */}
                            <tbody className="divide-y divide-gray-800">

                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-white/[0.02]"
                                    >
                                        {/* USER */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FB831C]/10 text-sm font-semibold text-[#FB831C]">
                                                    {user.fullName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "U"}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-200">
                                                        {user.fullName || "Unknown User"}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        {user.uid}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-300">
                                                {user.email}
                                            </span>
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-5 py-4">
                                            <span className="inline-flex rounded-full border border-[#FB831C]/20 bg-[#FB831C]/10 px-3 py-1 text-xs font-medium capitalize text-[#FB831C]">
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* SECRET CODE */}
                                        <td className="px-5 py-4">
                                            <span className="font-mono text-sm text-gray-300">
                                                {user.secretCode || "—"}
                                            </span>
                                        </td>

                                        {/* CREATED */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-400">
                                                {user.createdAt
                                                    ? new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )
                                                    : "—"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    {/* TABLE FOOTER */}
                    <div className="border-t border-gray-800 px-5 py-3">
                        <p className="text-xs text-gray-500">
                            Showing{" "}
                            <span className="text-gray-300">
                                {filteredUsers.length}
                            </span>{" "}
                            {filteredUsers.length === 1 ? "user" : "users"}
                            {isSearching && (
                                <>
                                    {" "}matching{" "}
                                    <span className="text-gray-300">
                                        "{search}"
                                    </span>
                                </>
                            )}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Users;