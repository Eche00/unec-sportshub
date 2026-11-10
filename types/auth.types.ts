
import { Timestamp } from "firebase/firestore";

// USER TYPES

export type UserGender = "male" | "female";

export type UserRole =
    | "superadmin"
    | "university_admin"
    | "faculty_admin"
    | "department_admin"
    | "player";

export type UserStatus =
    | "pending"
    | "active"
    | "suspended"
    | "rejected";

export type RegistrationType = "player";

export interface User {
    uid: string;

    // Personal information
    fullName: string;
    userName: string;

    email: string;
    phone: string;
    profileImage: string | null;
    coverImage: string | null;

    gender: UserGender;

    // Authentication
    emailVerified: boolean;
    phoneVerified: boolean;

    // Authorization
    role: UserRole;
    status: UserStatus;

    // Organizational scope
    universityId: string | null;
    facultyId: string | null;
    departmentId: string | null;
    classId: string | null;

    // Player relationship
    playerId: string | null;

    // Registration information
    registrationType: RegistrationType;

    bio: string | null;

    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastLoginAt: Timestamp | null;
}

// PLAYER TYPES

export type PreferredFoot = "right" | "left" | "both";

export type PlayerStatus =
    | "pending"
    | "active"
    | "suspended"
    | "inactive";

export interface PlayerStatistics {
    matchesPlayed: number;
    goalsScored: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
}

export interface Player {
    userId: string;

    // Player identity
    fullName: string;

    // Organizational scope
    universityId: string;
    facultyId: string;
    departmentId: string;
    classId: string;

    position: string;
    shirtNumber: number;

    preferredFoot: PreferredFoot;

    // Performance statistics
    statistics: PlayerStatistics;

    // Player status
    status: PlayerStatus;

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// FIRESTORE COLLECTION NAMES

export const COLLECTIONS = {
    USERS: "users",
    PLAYERS: "players",
} as const;

// DEFAULT PLAYER STATISTICS

export const DEFAULT_PLAYER_STATISTICS: PlayerStatistics = {
    matchesPlayed: 0,
    goalsScored: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
};
