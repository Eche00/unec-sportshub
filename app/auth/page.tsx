"use client";

import React, { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/utils/logics/auth";

function Page() {
    const {
        handleLogin,
        handleSignup,
        isLoading,
        error,
    } = useAuth();

    //  NEW: auth mode toggle
    const [mode, setMode] = useState<"login" | "signup">("login");

    return (
        <main className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-screen">

                {/* LEFT SIDE  */}
                <section className="relative hidden lg:flex items-center justify-center overflow-hidden border-r border-gray-800 bg-[#0B1120]"> <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" /> <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" /> <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:70px_70px]" /> <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col items-center text-center px-10" > <div className="relative mb-16 w-full flex justify-center"> <div className="relative w-[420px] h-[240px]"> <div className="absolute inset-0 rounded-[60px] bg-linear-to-br from-[#0B1220]/80 to-[#0F2A1D]/80 blur-sm" /> <div className="absolute inset-0 flex items-center justify-center animate-pulse"> <Link href="/" className="border-2 border-[#3B82F6] rounded-full p-2 flex items-center justify-center"> <img src="/logo.png" alt="" className="w-8 h-8 object-cover" /> </Link> </div> <div className="absolute inset-6 rounded-[40px] border border-white/10" /> </div> </div> <h1 className="text-6xl font-black tracking-tight leading-none"> <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Sports </span>{" "} Manager </h1> <p className="mt-6 text-gray-400 max-w-lg text-lg leading-relaxed"> Experience the thrill of the game, where champions rise and trophies are earned under stadium lights and roaring crowds. </p> </motion.div> </section>

                {/* RIGHT SIDE */}
                <section className="relative flex flex-col items-center justify-center lg:py-14 lg:px-8 bg-[#0A0F1C] overflow-hidden">

                    {/* mobile logo  */}
                    <div className="relative lg:hidden w-full flex justify-center">
                        <div className="relative w-[420px] h-[240px]">
                            <div className="absolute inset-0 rounded-[60px] bg-linear-to-br from-[#0B1220]/80 to-[#0F2A1D]/80 blur-sm" />
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                <Link href="/" className="border-2 border-[#3B82F6] rounded-full p-2 flex items-center justify-center">
                                    <img src="/logo.png" alt="" className="w-8 h-8 object-cover" />
                                </Link>
                            </div>
                            <div className="absolute inset-6 rounded-[40px] border border-white/10" />
                        </div>
                    </div>

                    {/* FORM */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-xl mt-4 lg:mt-0"
                    >
                        <div className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19] rounded-t-[32px] lg:rounded-b-[32px] border border-gray-800 overflow-hidden shadow-2xl">

                            <div className="relative z-10 p-7 lg:p-9">

                                {/* HEADER */}
                                <div className="text-center">
                                    <h2 className="text-4xl font-black tracking-tight">
                                        {mode === "login" ? "Sign In" : "Sign Up"}
                                    </h2>

                                    <p className="text-gray-400 mt-3">
                                        {mode === "login"
                                            ? "Welcome Back ! Please enter your details."
                                            : "Create an account to get started."}
                                    </p>
                                </div>

                                {/* ERROR */}
                                {error && (
                                    <p className="mt-4 text-sm text-red-400 text-center">
                                        {error}
                                    </p>
                                )}

                                {/* FORM */}
                                <form
                                    onSubmit={mode === "login" ? handleLogin : handleSignup}
                                    className="mt-10 space-y-5"
                                >
                                    {mode === "signup" && (
                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter full name"
                                                className="w-full h-14 px-4 rounded-2xl border border-gray-800 bg-[#0F172A] text-white outline-none"
                                                required
                                            />
                                        </div>


                                    )}

                                    {/* EMAIL */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Email</label>
                                        <div className="flex items-center gap-3 h-14 px-4 rounded-2xl border border-gray-800 bg-[#0F172A]">
                                            <EmailRoundedIcon className="text-gray-500" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="w-full bg-transparent outline-none text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Password</label>
                                        <div className="flex items-center gap-3 h-14 px-4 rounded-2xl border border-gray-800 bg-[#0F172A]">
                                            <LockRoundedIcon className="text-gray-500" />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="w-full bg-transparent outline-none text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/*  SECRET CODE (LOGIN ONLY) */}
                                    {mode === "login" && (
                                        <div>
                                            <label className="text-sm text-gray-400 mb-2 block">
                                                Secret Code
                                            </label>

                                            <div className="flex items-center gap-3 h-14 px-4 rounded-2xl border border-gray-800 bg-[#0F172A]">
                                                <SecurityRoundedIcon className="text-gray-500" />

                                                <input
                                                    type="text"
                                                    name="secretCode"
                                                    placeholder="Enter secret code"
                                                    className="w-full bg-transparent outline-none text-white"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {/*  SIGNUP ONLY FIELDS */}


                                    <div className="flex justify-end">
                                        <button type="button" className="text-sm text-cyan-400">
                                            Forgot Account?
                                        </button>
                                    </div>

                                    {/* SUBMIT */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 rounded-2xl font-semibold text-black bg-linear-to-r from-cyan-400 to-purple-500 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-t-2 border-cyan-400 rounded-full animate-spin" />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                {mode === "login" ? "Continue" : "Create Account"}
                                                <ArrowForwardRoundedIcon fontSize="small" />
                                            </span>
                                        )}
                                    </button>
                                </form>

                                {/* SWITCH BUTTON */}
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() =>
                                            setMode(mode === "login" ? "signup" : "login")
                                        }
                                        className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
                                    >
                                        {mode === "login"
                                            ? "Don't have an account? Sign up"
                                            : "Already have an account? Login"}
                                    </button>
                                </div>


                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}

export default Page;