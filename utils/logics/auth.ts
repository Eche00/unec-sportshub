import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    //  SECRET CODE 
    const generateSecretCode = () => {
        const random = Math.random().toString(36).substring(2, 7).toUpperCase();
        return `SC-2026`;
    };

    // LOGIN
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const secretCode = formData.get("secretCode") as string;

        try {
            // 1. SIGN IN USER
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // 2. FETCH USER DATA FROM FIRESTORE
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                throw new Error("User data not found");
            }

            const userData = userSnap.data();

            // 3. VERIFY SECRET CODE
            if (userData.secretCode !== secretCode) {
                setError("Invalid secret code.");
                setIsLoading(false);
                return;
            }

            router.push("/admin");
        } catch (err: any) {
            console.error("Login Error:", err);

            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else {
                setError(err.message || "Login failed. Please try again.");
            }

            setIsLoading(false);
        }
    };

    // SIGNUP
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("password") as string; // fallback safe

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: fullName,
            });

            // SECRET CODE
            const secretCode = generateSecretCode();

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                fullName,
                createdAt: new Date().toISOString(),
                secretCode,
                role: "admin",
            });

            router.push("/admin");
        } catch (err: any) {
            console.error("Sign Up Error:", err);

            if (err.code === "auth/email-already-in-use") {
                setError("Email is already in use.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }

            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleLogin,
        handleSignup,
    };
};