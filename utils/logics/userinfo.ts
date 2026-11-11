
'use client'

import { useState, useEffect } from 'react'
import {
    doc,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore'
import {
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

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

const convertTimestamp = (
    value: unknown
): Date | undefined => {
    if (value instanceof Timestamp) {
        return value.toDate()
    }

    if (value instanceof Date) {
        return value
    }

    return undefined
}

// Hook to get the current authenticated user's info
export function useUserInfo(): UserInfo | null {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        let unsubscribeUserSnapshot: (() => void) | undefined

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            // Clean up previous user's Firestore listener
            if (unsubscribeUserSnapshot) {
                unsubscribeUserSnapshot()
                unsubscribeUserSnapshot = undefined
            }

            if (!user) {
                setUserInfo(null)
                return
            }

            const userRef = doc(db, 'users', user.uid)

            unsubscribeUserSnapshot = onSnapshot(
                userRef,
                (docSnap) => {
                    if (!docSnap.exists()) {
                        setUserInfo(null)
                        return
                    }

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
                        lastLoginAt:
                            convertTimestamp(data.lastLoginAt) ?? null,
                    })
                },
                (error) => {
                    console.error('User Info Error:', error)
                    setUserInfo(null)
                }
            )
        })

        return () => {
            unsubscribeAuth()

            if (unsubscribeUserSnapshot) {
                unsubscribeUserSnapshot()
            }
        }
    }, [])

    return userInfo
}

// Separate function for sign-out
export const handleSignOut = async (
    router: ReturnType<typeof useRouter>
) => {
    try {
        await signOut(auth)
        router.push('/auth')
    } catch (error) {
        console.error('Error signing out:', error)
    }
}
