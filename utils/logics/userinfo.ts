
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

// user information interface
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

// user information loading state
export interface UserInfoState {
    userInfo: UserInfo | null
    isLoading: boolean
}

// convert firebase timestamps to dates
const convertTimestamp = (value: unknown): Date | undefined => {
    if (value instanceof Timestamp) return value.toDate()
    if (value instanceof Date) return value
    return undefined
}

// hook to get the current authenticated user's info
export function useUserInfo(): UserInfoState {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let unsubscribeUserSnapshot: (() => void) | undefined
        let isMounted = true

        // listen for authentication changes
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            // clean up previous user's firestore listener
            if (unsubscribeUserSnapshot) {
                unsubscribeUserSnapshot()
                unsubscribeUserSnapshot = undefined
            }

            // reset user information when authentication changes
            if (isMounted) {
                setUserInfo(null)
                setIsLoading(true)
            }

            // handle unauthenticated users
            if (!user) {
                if (isMounted) setIsLoading(false)
                return
            }

            // listen for the authenticated user's firestore document
            const userRef = doc(db, 'users', user.uid)

            unsubscribeUserSnapshot = onSnapshot(
                userRef,
                (docSnap) => {
                    if (!isMounted) return

                    // handle missing user document
                    if (!docSnap.exists()) {
                        setUserInfo(null)
                        setIsLoading(false)
                        return
                    }

                    // map firestore data to user information
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

        // clean up listeners when the component unmounts
        return () => {
            isMounted = false
            unsubscribeAuth()
            unsubscribeUserSnapshot?.()
        }
    }, [])

    return { userInfo, isLoading }
}

// separate function for sign-out
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
