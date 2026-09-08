"use client";

import React, { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/utils/logics/auth";
import Input from "@/components/ui/Input";
import { Person } from "@mui/icons-material";
import Button from "@/components/ui/Button";

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
        <main className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-screen">

                {/* LEFT SIDE  */}
                <section className="relative hidden lg:flex items-center justify-center overflow-hidden border-r border-[#FFFFFF33] ">
                    <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#FB831C]/20 blur-3xl rounded-full" />
                    <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#0F2A1D]/80 blur-3xl rounded-full" />
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:70px_70px]" />
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col items-center text-center px-10" >
                        <div className="relative  w-full flex justify-center">
                            <div className="relative w-[420px] h-[240px]">
                                <div className="absolute inset-0 rounded-[60px] bg-linear-to-br from-[#0B1220]/80 to-[#0F2A1D]/80 blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                    <Link href="/" className="relative border-2 border-[#FB831C] rounded-full p-3 flex items-center justify-center">
                                        <img src="/logo.png" alt="" className="w-8 h-8 object-cover" />
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  animate-pulse">
                                            <svg
                                                width="60"
                                                height="60"
                                                viewBox="0 0 80 80"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M39.9688 2.53749C17.7688 2.22499 1.28125 21.2375 2.3875 41.5687C3.69375 65.5125 20.8125 77.5437 40.8375 77.4062C61.875 77.2625 77.8375 62.35 77.4 39.825C76.9688 17.3375 60.4313 2.83124 39.9688 2.53749Z"
                                                    fill="#C8C8C8"
                                                />

                                                <path
                                                    d="M22.4126 9.50626C6.87506 18.4125 -2.98744 43.6563 13.5626 62.7563C15.5876 65.0938 18.8063 66.725 21.2501 67.8375C37.9376 75.3813 58.1313 63.7813 65.9438 54.9375C72.1438 47.9188 74.4251 43.2625 73.6876 33.6813C73.1188 26.2313 69.9313 19.0375 63.3251 13.7188C48.3876 1.66876 32.2813 3.84376 22.4126 9.50626Z"
                                                    fill="white"
                                                />

                                                <path
                                                    d="M38.0625 24.8687C38.0063 24.8375 32.225 21.5187 27.7376 19.8562C23.0626 18.125 19.6125 17.1937 19.575 17.1875L20.2188 14.775C20.3625 14.8125 23.8125 15.7375 28.6063 17.5187C33.2938 19.2562 39.0688 22.5687 39.3125 22.7125L38.0625 24.8687ZM48.2294 18.3462L51.6313 6.20749L54.0388 6.88186L50.6375 19.0206L48.2294 18.3462ZM73.5 34.075C73.4688 34.0625 70.1438 32.8 66.4313 31.7937C63.6376 31.0375 60.0375 30.2687 60 30.2625L60.5188 27.8187C60.6687 27.85 64.2188 28.6062 67.0813 29.3812C70.9251 30.4187 74.25 31.6875 74.3938 31.7375L73.5 34.075ZM53.8313 58.6C53.8313 58.5625 53.5188 54.75 52.7688 50.85C52.0251 47 50.6063 43.375 50.5938 43.3437L52.9188 42.425C52.9813 42.5812 54.4375 46.2937 55.2251 50.3812C56 54.425 56.3125 58.2437 56.3251 58.4062L53.8313 58.6ZM66.2625 62.075L64.6125 60.1937C64.6375 60.175 67.0375 58.05 70 54.05C72.7375 50.35 74 47.1125 74.0126 47.075L76.3438 47.9687C76.2876 48.1125 74.9438 51.5625 72.0063 55.5312C68.875 59.7687 66.3688 61.9812 66.2625 62.075ZM20.5294 49.3L34.9938 36.3894L36.6588 38.2544L22.1938 51.165L20.5294 49.3ZM8.0688 45.8437C8.0313 45.6 7.2063 39.8187 7.2063 34.5312C7.2063 29.2562 7.8063 24.375 7.83755 24.1687L10.3188 24.4812C10.3125 24.5312 9.71255 29.4187 9.71255 34.5312C9.71255 39.6312 10.5438 45.4312 10.55 45.4875L8.0688 45.8437ZM44.5626 71.0312C44.4063 71.0125 40.5938 70.5312 34 68.5937C29.8001 67.3562 25 64.8187 24.7938 64.7125L25.9688 62.5062C26.0188 62.5312 30.75 65.0375 34.7063 66.2C41.0813 68.075 44.8313 68.55 44.8688 68.5562L44.5626 71.0312Z"
                                                    fill="#171717"
                                                />

                                                <path
                                                    d="M33.3562 20.45C33.1625 20.9375 33.4187 38.3437 33.8125 38.8625C34.2062 39.3812 51.7062 45.325 52.4875 45.1312C53.2687 44.9375 62.6062 30.2437 62.6062 29.6562C62.6062 29.0687 51.1187 14.9 50.5312 14.7687C49.9437 14.6375 33.6188 19.7937 33.3562 20.45ZM73.35 22.5875C73.35 22.5875 70.7749 31.1562 70.7749 31.8125C70.7749 32.4625 72.3437 36.0562 73.0625 40.4937C73.7812 44.9312 72.7374 51.5937 73.1937 51.8562C73.6499 52.1187 75.9125 51.9875 75.9125 51.9875C75.9125 51.9875 78.0937 45.1312 77.175 36.3187C76.2562 27.5 73.35 22.5875 73.35 22.5875ZM54.775 56.6875C54.25 56.7375 40.475 68.5687 40.5375 68.9C40.6 69.225 45.9312 77.0812 45.9312 77.0812C45.9312 77.0812 52.6312 76.55 58.7687 73.225C64.9062 69.9 67.2375 66.9437 67.2375 66.9437C67.2375 66.9437 68.0875 59.0437 67.7625 58.9812C67.4437 58.9062 55.4312 56.625 54.775 56.6875ZM8.8062 41.9312C8.44995 42.225 6.38745 46.7625 5.79995 49.3125C5.21245 51.8562 4.88745 54.275 4.88745 54.275C4.88745 54.275 6.4562 58.8125 8.8062 62.175C11.7187 66.3375 15.5062 69.275 15.5062 69.275C15.5062 69.275 27.8687 65.5062 27.9375 64.9812C28.0062 64.4562 26.5 59.8875 25.4562 56.1C24.4125 52.3125 24.2187 48.0687 23.825 47.8062C23.4312 47.5437 19.45 46.3062 16.3187 45.0625C13.1875 43.8187 9.19995 41.6062 8.8062 41.9312ZM4.9312 26.175C4.9312 26.175 8.34995 29.1312 8.87495 29.1312C9.39995 29.1312 12.7125 24.7437 16.0562 22.0812C20.5625 18.4875 22.7812 17.3125 22.85 16.8562C22.9125 16.4 24.875 5.49374 24.875 5.49374C24.875 5.49374 17.625 8.23749 12.3375 14.3062C7.04995 20.375 4.9312 26.175 4.9312 26.175ZM41.9062 2.58124C41.9062 2.58124 46.075 4.72499 47.5937 5.78124C49.1125 6.83749 51.35 9.07499 52.0125 9.14374C52.6687 9.21249 61.7374 9.21874 61.7374 9.21874C61.7374 9.21874 57.625 6.40624 53.0687 4.79374C47.5875 2.84999 41.9062 2.58124 41.9062 2.58124Z"
                                                    fill="#474C4F"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                                <div className="absolute inset-6 rounded-[40px] border border-white/10" />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* RIGHT SIDE */}
                <section className="relative flex flex-col items-center justify-center lg:py-14 lg:px-8 bg-[#0B0B0B] overflow-hidden">

                    {/* mobile logo  */}
                    <div className="relative lg:hidden w-full flex justify-center">
                        <div className="relative w-[420px] h-[240px]">
                            <div className="absolute inset-0 rounded-[60px] bg-linear-to-br from-[#0B1220]/80 to-[#0F2A1D]/80 blur-sm" />
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                <Link href="/" className="relative border-2 border-[#FB831C] rounded-full p-2 flex items-center justify-center">
                                    <img src="/logo.png" alt="" className="w-8 h-8 object-cover" />
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  animate-pulse">
                                        <svg
                                            width="60"
                                            height="60"
                                            viewBox="0 0 80 80"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M39.9688 2.53749C17.7688 2.22499 1.28125 21.2375 2.3875 41.5687C3.69375 65.5125 20.8125 77.5437 40.8375 77.4062C61.875 77.2625 77.8375 62.35 77.4 39.825C76.9688 17.3375 60.4313 2.83124 39.9688 2.53749Z"
                                                fill="#C8C8C8"
                                            />

                                            <path
                                                d="M22.4126 9.50626C6.87506 18.4125 -2.98744 43.6563 13.5626 62.7563C15.5876 65.0938 18.8063 66.725 21.2501 67.8375C37.9376 75.3813 58.1313 63.7813 65.9438 54.9375C72.1438 47.9188 74.4251 43.2625 73.6876 33.6813C73.1188 26.2313 69.9313 19.0375 63.3251 13.7188C48.3876 1.66876 32.2813 3.84376 22.4126 9.50626Z"
                                                fill="white"
                                            />

                                            <path
                                                d="M38.0625 24.8687C38.0063 24.8375 32.225 21.5187 27.7376 19.8562C23.0626 18.125 19.6125 17.1937 19.575 17.1875L20.2188 14.775C20.3625 14.8125 23.8125 15.7375 28.6063 17.5187C33.2938 19.2562 39.0688 22.5687 39.3125 22.7125L38.0625 24.8687ZM48.2294 18.3462L51.6313 6.20749L54.0388 6.88186L50.6375 19.0206L48.2294 18.3462ZM73.5 34.075C73.4688 34.0625 70.1438 32.8 66.4313 31.7937C63.6376 31.0375 60.0375 30.2687 60 30.2625L60.5188 27.8187C60.6687 27.85 64.2188 28.6062 67.0813 29.3812C70.9251 30.4187 74.25 31.6875 74.3938 31.7375L73.5 34.075ZM53.8313 58.6C53.8313 58.5625 53.5188 54.75 52.7688 50.85C52.0251 47 50.6063 43.375 50.5938 43.3437L52.9188 42.425C52.9813 42.5812 54.4375 46.2937 55.2251 50.3812C56 54.425 56.3125 58.2437 56.3251 58.4062L53.8313 58.6ZM66.2625 62.075L64.6125 60.1937C64.6375 60.175 67.0375 58.05 70 54.05C72.7375 50.35 74 47.1125 74.0126 47.075L76.3438 47.9687C76.2876 48.1125 74.9438 51.5625 72.0063 55.5312C68.875 59.7687 66.3688 61.9812 66.2625 62.075ZM20.5294 49.3L34.9938 36.3894L36.6588 38.2544L22.1938 51.165L20.5294 49.3ZM8.0688 45.8437C8.0313 45.6 7.2063 39.8187 7.2063 34.5312C7.2063 29.2562 7.8063 24.375 7.83755 24.1687L10.3188 24.4812C10.3125 24.5312 9.71255 29.4187 9.71255 34.5312C9.71255 39.6312 10.5438 45.4312 10.55 45.4875L8.0688 45.8437ZM44.5626 71.0312C44.4063 71.0125 40.5938 70.5312 34 68.5937C29.8001 67.3562 25 64.8187 24.7938 64.7125L25.9688 62.5062C26.0188 62.5312 30.75 65.0375 34.7063 66.2C41.0813 68.075 44.8313 68.55 44.8688 68.5562L44.5626 71.0312Z"
                                                fill="#171717"
                                            />

                                            <path
                                                d="M33.3562 20.45C33.1625 20.9375 33.4187 38.3437 33.8125 38.8625C34.2062 39.3812 51.7062 45.325 52.4875 45.1312C53.2687 44.9375 62.6062 30.2437 62.6062 29.6562C62.6062 29.0687 51.1187 14.9 50.5312 14.7687C49.9437 14.6375 33.6188 19.7937 33.3562 20.45ZM73.35 22.5875C73.35 22.5875 70.7749 31.1562 70.7749 31.8125C70.7749 32.4625 72.3437 36.0562 73.0625 40.4937C73.7812 44.9312 72.7374 51.5937 73.1937 51.8562C73.6499 52.1187 75.9125 51.9875 75.9125 51.9875C75.9125 51.9875 78.0937 45.1312 77.175 36.3187C76.2562 27.5 73.35 22.5875 73.35 22.5875ZM54.775 56.6875C54.25 56.7375 40.475 68.5687 40.5375 68.9C40.6 69.225 45.9312 77.0812 45.9312 77.0812C45.9312 77.0812 52.6312 76.55 58.7687 73.225C64.9062 69.9 67.2375 66.9437 67.2375 66.9437C67.2375 66.9437 68.0875 59.0437 67.7625 58.9812C67.4437 58.9062 55.4312 56.625 54.775 56.6875ZM8.8062 41.9312C8.44995 42.225 6.38745 46.7625 5.79995 49.3125C5.21245 51.8562 4.88745 54.275 4.88745 54.275C4.88745 54.275 6.4562 58.8125 8.8062 62.175C11.7187 66.3375 15.5062 69.275 15.5062 69.275C15.5062 69.275 27.8687 65.5062 27.9375 64.9812C28.0062 64.4562 26.5 59.8875 25.4562 56.1C24.4125 52.3125 24.2187 48.0687 23.825 47.8062C23.4312 47.5437 19.45 46.3062 16.3187 45.0625C13.1875 43.8187 9.19995 41.6062 8.8062 41.9312ZM4.9312 26.175C4.9312 26.175 8.34995 29.1312 8.87495 29.1312C9.39995 29.1312 12.7125 24.7437 16.0562 22.0812C20.5625 18.4875 22.7812 17.3125 22.85 16.8562C22.9125 16.4 24.875 5.49374 24.875 5.49374C24.875 5.49374 17.625 8.23749 12.3375 14.3062C7.04995 20.375 4.9312 26.175 4.9312 26.175ZM41.9062 2.58124C41.9062 2.58124 46.075 4.72499 47.5937 5.78124C49.1125 6.83749 51.35 9.07499 52.0125 9.14374C52.6687 9.21249 61.7374 9.21874 61.7374 9.21874C61.7374 9.21874 57.625 6.40624 53.0687 4.79374C47.5875 2.84999 41.9062 2.58124 41.9062 2.58124Z"
                                                fill="#474C4F"
                                            />
                                        </svg>
                                    </div>
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
                        className="relative z-10 w-full max-w-md mt-4 lg:mt-0"
                    >
                        <div className="relative group bg-[#131313] sm:rounded-t-xl rounded-t-[32px] lg:rounded-b-xl border border-[#FFFFFF33] overflow-hidden shadow-2xl">

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
                                        <div className="flex items-center gap-3">
                                            <Person className="text-gray-500" />
                                            <Input
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter full name"

                                                required
                                            />
                                        </div>


                                    )}

                                    {/* EMAIL */}
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <EmailRoundedIcon className="text-gray-500" />
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <LockRoundedIcon className="text-gray-500" />
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
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

                                            <div className="flex items-center gap-3">
                                                <SecurityRoundedIcon className="text-gray-500" />

                                                <Input
                                                    type="text"
                                                    name="secretCode"
                                                    placeholder="Enter secret code"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {/*  SIGNUP ONLY FIELDS */}


                                    <div className="flex justify-end">
                                        <button type="button" className="text-xs underline text-gray-500 cursor-pointer">
                                            Forgot Account?
                                        </button>
                                    </div>

                                    {/* SUBMIT */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isLoading}
                                        className="w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-t-2 border-[#FB831C] rounded-full animate-spin" />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                {mode === "login" ? "Continue" : "Create Account"}
                                                <ArrowForwardRoundedIcon fontSize="small" />
                                            </span>
                                        )}
                                    </Button>
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