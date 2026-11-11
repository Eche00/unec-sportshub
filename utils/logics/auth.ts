import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    // login
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") as string)?.trim();
        const password = formData.get("password") as string;

        try {
            // 1. Sign in
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // 2. Fetch user document
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await signOut(auth);
                throw new Error("User account data not found.");
            }

            const userData = userSnap.data();

            // 3. Check email verification
            if (!user.emailVerified) {
                try {
                    // Automatically resend verification email
                    await sendEmailVerification(user);

                    toast.success(
                        "Verification email sent! Please check your inbox."
                    );
                } catch (verificationError: unknown) {
                    console.error(
                        "Verification Email Error:",
                        verificationError
                    );

                    const error = verificationError as { code?: string };

                    if (error.code === "auth/too-many-requests") {
                        toast.error(
                            "Too many requests. Please check your inbox or try again later."
                        );
                    } else {
                        toast.error(
                            "Your email is not verified. Failed to resend verification email."
                        );
                    }
                }

                await signOut(auth);
                router.push("/verify");
                return;
            }

            // 4. Check account status
            if (
                userData.status === "suspended" ||
                userData.status === "rejected"
            ) {
                await signOut(auth);

                if (userData.status === "suspended") {
                    throw new Error(
                        "Your account has been suspended. Please contact your administrator."
                    );
                }

                throw new Error(
                    "Your account registration was rejected. Please contact your administrator."
                );
            }

            // 5. Update login information
            await updateDoc(userRef, {
                emailVerified: user.emailVerified,
                lastLoginAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            // 6. Success
            toast.success(`Welcome back, ${userData.fullName}!`);

            // 7. Redirect based on profile completion
            if (
                !userData.userName ||
                !userData.phone ||
                !userData.gender ||
                !userData.universityId ||
                !userData.facultyId ||
                !userData.departmentId ||
                !userData.classId
            ) {
                router.push("/profile-setup");
            } else {
                router.push("/");
            }

        } catch (err: unknown) {
            console.error("Login Error:", err);

            const error = err as { code?: string; message?: string };

            if (error.code === "auth/invalid-credential") {
                toast.error("Invalid email or password.");
            } else if (error.code === "auth/too-many-requests") {
                toast.error("Too many attempts. Please try again later.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Please enter a valid email address.");
            } else {
                toast.error(error.message || "Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    // sign up
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const fullName = (formData.get("fullName") as string)?.trim();
        const email = (formData.get("email") as string)?.trim();
        const password = formData.get("password") as string;

        // validation
        if (!fullName || !email || !password) {
            toast.error("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            setIsLoading(false);
            return;
        }

        let createdUser = null;

        try {
            // 1. create firebase account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            createdUser = user;

            // 2. update firebase profile
            await updateProfile(user, { displayName: fullName });

            // 3. create user document
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                fullName,
                userName: "",
                email: user.email,
                phone: "",
                profileImage: null,
                coverImage: null,
                gender: null,
                emailVerified: false,
                phoneVerified: false,
                role: "player",
                status: "pending",
                universityId: null,
                facultyId: null,
                departmentId: null,
                classId: null,
                playerId: null,
                registrationType: "player",
                bio: null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLoginAt: null,
            });

            // 4. send email verification
            await sendEmailVerification(user);

            // 5. sign out
            await signOut(auth);

            // 6. success toast
            toast.success("Account created! Please check your email to verify your account.");

            // 7. redirect
            router.push("/verify");
        } catch (err: unknown) {
            console.error("Sign Up Error:", err);
            const error = err as { code?: string; message?: string };

            if (createdUser && auth.currentUser?.uid === createdUser.uid) {
                try {
                    await signOut(auth);
                } catch (signOutError) {
                    console.error("Sign out error:", signOutError);
                }
            }

            if (error.code === "auth/email-already-in-use") {
                toast.error("An account with this email already exists.");
            } else if (error.code === "auth/weak-password") {
                toast.error("Password must be at least 8 characters.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Please enter a valid email address.");
            } else {
                toast.error(error.message || "Failed to create account. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // resend verification email
    const handleResendVerification = async () => {
        setIsLoading(true);

        try {
            const user = auth.currentUser;

            if (!user) {
                toast.error("Please sign in again to resend your verification email.");
                return;
            }

            await user.reload();

            if (auth.currentUser?.emailVerified) {
                toast.success("Your email is already verified!");
                return;
            }

            await sendEmailVerification(user);
            toast.success("Verification email sent! Please check your inbox.");
        } catch (err: unknown) {
            console.error("Resend Verification Error:", err);
            const error = err as { code?: string };

            if (error.code === "auth/too-many-requests") {
                toast.error("Too many requests. Please try again later.");
            } else {
                toast.error("Failed to send verification email. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // open email client in a new tab
    const handleOpenEmail = () => {
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    };

    return {
        isLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleLogin,
        handleSignup,
        handleResendVerification,
        handleOpenEmail
    };
};