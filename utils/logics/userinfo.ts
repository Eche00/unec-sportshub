
'use client'

import { useState, useEffect } from 'react'
import {
    collection,
    doc,
    limit,
    onSnapshot,
    query,
    Timestamp,
    where,
} from 'firebase/firestore'
import {
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

//* user information interface
export interface UserInfo {
    uid: string
    fullName: string
    userName: string
    email: string | null
    role: string
    status: string
    universityId: string | null
    facultyId: string | null
    departmentId: string | null
    classId: string | null
    playerId: string | null
    profileImage: string | null
    coverImage: string | null
    gender: string | null
    phone: string
    bio: string | null
    createdAt?: Date
    updatedAt?: Date
    lastLoginAt?: Date | null
}

//* player statistics interface
export interface PlayerStatistics {
    goalsScored: number
    assists: number
    appearances: number
    [key: string]: number | undefined
}

//* player achievement interface
export interface PlayerAchievement {
    id: string
    title: string
    description?: string
    image?: string
}

//* complete player profile interface
export interface PlayerProfile extends UserInfo {
    position: string
    shirtNumber: number | string
    preferredFoot: string
    sports: string[]
    statistics: PlayerStatistics
    achievements: PlayerAchievement[]
}

//* user information loading state
export interface UserInfoState {
    userInfo: UserInfo | null
    isLoading: boolean
}

//* convert firebase timestamps to dates
const convertTimestamp = (value: unknown): Date | undefined => {
    if (value instanceof Timestamp) return value.toDate()
    if (value instanceof Date) return value
    return undefined
}

//* hook to get the current authenticated user's info
export function useUserInfo(): UserInfoState {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let unsubscribeUserSnapshot: (() => void) | undefined
        let isMounted = true

        //* listen for authentication changes
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            //* clean up previous user's firestore listener
            unsubscribeUserSnapshot?.()
            unsubscribeUserSnapshot = undefined

            //* reset user information when authentication changes
            if (isMounted) {
                setUserInfo(null)
                setIsLoading(true)
            }

            //* handle unauthenticated users
            if (!user) {
                if (isMounted) setIsLoading(false)
                return
            }

            //* listen for the authenticated user's firestore document
            const userRef = doc(db, 'users', user.uid)

            unsubscribeUserSnapshot = onSnapshot(
                userRef,
                (docSnap) => {
                    if (!isMounted) return

                    //* handle missing user document
                    if (!docSnap.exists()) {
                        setUserInfo(null)
                        setIsLoading(false)
                        return
                    }

                    //* map firestore data to user information
                    const data = docSnap.data()

                    setUserInfo({
                        uid: user.uid,
                        fullName: data.fullName || 'Player',
                        userName: data.userName || '',
                        email: user.email,
                        role: data.role || 'player',
                        status: data.status || 'pending',
                        universityId: data.universityId || null,
                        facultyId: data.facultyId || null,
                        departmentId: data.departmentId || null,
                        classId: data.classId || null,
                        playerId: data.playerId || null,
                        profileImage: data.profileImage || null,
                        coverImage: data.coverImage || null,
                        gender: data.gender || null,
                        phone: data.phone || '',
                        bio: data.bio || null,
                        createdAt: convertTimestamp(data.createdAt),
                        updatedAt: convertTimestamp(data.updatedAt),
                        lastLoginAt: convertTimestamp(data.lastLoginAt) ?? null,
                    })

                    setIsLoading(false)
                },
                (error) => {
                    console.error('User Info Error:', error)

                    if (!isMounted) return

                    setUserInfo(null)
                    setIsLoading(false)
                }
            )
        })

        //* clean up listeners when the component unmounts
        return () => {
            isMounted = false
            unsubscribeAuth()
            unsubscribeUserSnapshot?.()
        }
    }, [])

    return { userInfo, isLoading }
}

//* hook to get any player's profile using their username
export function usePlayerProfile(username: string) {
    const [player, setPlayer] = useState<PlayerProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!username) {
            setPlayer(null)
            setError(null)
            setIsLoading(false)
            return
        }

        let isMounted = true
        let unsubscribeUser: (() => void) | undefined
        let unsubscribePlayer: (() => void) | undefined

        setIsLoading(true)
        setError(null)
        setPlayer(null)

        //* find user using username
        const playerQuery = query(
            collection(db, 'users'),
            where('userName', '==', username),
            where('role', '==', 'player'),
            limit(1)
        )

        unsubscribeUser = onSnapshot(
            playerQuery,
            (snapshot) => {
                if (!isMounted) return

                //* stop previous player listener
                unsubscribePlayer?.()
                unsubscribePlayer = undefined

                //* handle missing player
                if (snapshot.empty) {
                    setPlayer(null)
                    setIsLoading(false)
                    return
                }

                const userDoc = snapshot.docs[0]
                const userData = userDoc.data()

                //* map user document
                const userInfo: UserInfo = {
                    uid: userDoc.id,
                    fullName: userData.fullName || 'Player',
                    userName: userData.userName || '',
                    email: userData.email || null,
                    role: userData.role || 'player',
                    status: userData.status || 'pending',
                    universityId: userData.universityId || null,
                    facultyId: userData.facultyId || null,
                    departmentId: userData.departmentId || null,
                    classId: userData.classId || null,
                    playerId: userData.playerId || null,
                    profileImage: userData.profileImage || null,
                    coverImage: userData.coverImage || null,
                    gender: userData.gender || null,
                    phone: userData.phone || '',
                    bio: userData.bio || null,
                    createdAt: convertTimestamp(userData.createdAt),
                    updatedAt: convertTimestamp(userData.updatedAt),
                    lastLoginAt: convertTimestamp(userData.lastLoginAt) ?? null,
                }

                //* listen to the corresponding player document
                unsubscribePlayer = onSnapshot(
                    doc(db, 'players', userDoc.id),
                    (playerDoc) => {
                        if (!isMounted) return

                        //* handle missing player document
                        if (!playerDoc.exists()) {
                            setPlayer(null)
                            setIsLoading(false)
                            return
                        }

                        const data = playerDoc.data()

                        //* map complete player information
                        setPlayer({
                            ...userInfo,
                            position: data.position || '',
                            shirtNumber: data.shirtNumber ?? '',
                            preferredFoot: data.preferredFoot || '',
                            sports: Array.isArray(data.sports)
                                ? data.sports
                                : data.sports
                                    ? [data.sports]
                                    : [],
                            statistics: {
                                goalsScored: data.statistics?.goalsScored ?? 0,
                                assists: data.statistics?.assists ?? 0,
                                appearances: data.statistics?.matchesPlayed ?? 0,
                            },
                            achievements: Array.isArray(data.achievements)
                                ? data.achievements
                                : [],
                        })

                        setIsLoading(false)
                    },
                    (err) => {
                        if (!isMounted) return

                        console.error('Player Data Error:', err)
                        setError('Unable to load player statistics.')
                        setPlayer(null)
                        setIsLoading(false)
                    }
                )
            },
            (err) => {
                if (!isMounted) return

                console.error('Player Profile Error:', err)
                setError('Unable to load this profile.')
                setPlayer(null)
                setIsLoading(false)
            }
        )

        //* clean up listeners
        return () => {
            isMounted = false
            unsubscribeUser?.()
            unsubscribePlayer?.()
        }
    }, [username])

    return { player, isLoading, error }
}

//* separate function for sign-out
export const handleSignOut = async (
    router: ReturnType<typeof useRouter>
) => {
    try {
        await signOut(auth)
        router.push('/')
    } catch (error) {
        console.error('Error signing out:', error)
    }
}
