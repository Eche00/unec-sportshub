"use client";

import Link from "next/link";
import { useAuth } from "@/utils/logics/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function Page() {
    const { handleLogin, isLoading } = useAuth();
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden flex items-center justify-center">
            <section className="h-screen overflow-hidden relative flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden">
                {/* background image */}
                <div className="fixed inset-0 h-[75%]">
                    <img src="/auth-img.jpg" alt="Versity Sports Auth Img" className="w-full h-full object-cover object-center" />
                    {/* image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[var(--background)]" />
                    <div className="absolute inset-x-0 bottom-0 h-full bg-black/20 backdrop-blur-md" />
                </div>

                {/* form */}
                <div className="relative z-10 w-full max-w-md">
                    <div className="fixed left-0 w-full bottom-0 group bg-[var(--background)] sm:rounded-t-xl rounded-t-[24px] overflow-hidden shadow-2xl">
                        <div className="relative z-10 px-3 pt-3 pb-12">
                            {/* header */}
                            <div className="text-center relative">
                                <h2 className="text-[24px] font-medium tracking-tight text-[var(--foreground)]">Log in account</h2>
                                <Link href="/get-started" aria-label="Back to get started" className="absolute top-0 right-0 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77537 13.0944 4.52064 10.8606 4.01122L10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                        <path d="M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                    </svg>
                                </Link>
                            </div>

                            {/* form */}
                            <form onSubmit={handleLogin} className="mt-10 space-y-5">
                                {/* email */}
                                <div className="flex flex-col items-start gap-2">
                                    <label className="text-white text-[14px] font-medium">Email</label>
                                    <div className="relative w-full">
                                        <Input type="email" name="email" placeholder="Enter your email" required />
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.3542 2.5C15.5121 2.62817 16.2915 2.91786 16.8733 3.57254C17.9167 4.74681 17.9167 6.63676 17.9167 10.4167C17.9167 14.1966 17.9167 16.0865 16.8733 17.2608C16.2915 17.9155 15.5121 18.2052 14.3542 18.3333M5.64588 18.3333C4.48797 18.2052 3.70855 17.9155 3.12681 17.2608C2.08337 16.0865 2.08337 14.1966 2.08337 10.4167C2.08337 6.63676 2.08337 4.74681 3.12681 3.57254C3.70855 2.91786 4.48797 2.62817 5.64588 2.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* password */}
                                <div className="flex flex-col items-start gap-2">
                                    <label className="text-white text-[14px] font-medium">Password</label>
                                    <div className="relative w-full">
                                        <Input type="password" name="password" placeholder="Enter your password" required />
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.3542 2.5C15.5121 2.62817 16.2915 2.91786 16.8733 3.57254C17.9167 4.74681 17.9167 6.63676 17.9167 10.4167C17.9167 14.1966 17.9167 16.0865 16.8733 17.2608C16.2915 17.9155 15.5121 18.2052 14.3542 18.3333M5.64588 18.3333C4.48797 18.2052 3.70855 17.9155 3.12681 17.2608C2.08337 16.0865 2.08337 14.1966 2.08337 10.4167C2.08337 6.63676 2.08337 4.74681 3.12681 3.57254C3.70855 2.91786 4.48797 2.62817 5.64588 2.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* submit */}
                                <Button type="submit" variant="primary" disabled={isLoading} className="w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-t-2 border-[var(--primary-foreground)] rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">Log In</span>
                                    )}
                                </Button>
                            </form>

                            {/* switch button */}
                            <div className="mt-6 text-center">
                                <a href="/signup" className="text-[16px] text-[var(--primary)] transition-colors cursor-pointer">SignUp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Page;