"use client";

import Link from "next/link";

function Page() {
    return (
        <main className="relative min-h-screen min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
            {/* background image */}
            <div className="fixed z-10 inset-0 h-[75%]">
                <img src="/auth-img.jpg" alt="Versity Sports Auth Img" className="w-full h-full object-cover object-center" />
                {/* image overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[var(--background)]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black_45%)]" />
            </div>

            {/* bottom action panel */}
            <section className="fixed bottom-0 left-0 w-full z-20 bg-linear-to-b from-transparent via-[var(--background)] via-[8%] to-[var(--background)] px-3 py-12">
                {/* header */}
                <div className="flex flex-col gap-[8px] text-center mb-4">
                    <h2 className="text-[24px] text-[var(--foreground)]">Versity Sports</h2>
                    <p className="text-[var(--muted)] text-[14px] font-medium">Create your profile, join a team, stay updated <br /> with live tournaments and more</p>
                    <Link href="/" aria-label="Back to get started" className="absolute top-0 right-0 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77537 13.0944 4.52064 10.8606 4.01122L10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                            <path d="M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                        </svg>
                    </Link>
                </div>
                <div className="w-full max-w-md mx-auto space-y-4">
                    {/* sign up */}
                    <div className="w-full max-w-md mx-auto space-y-4">
                        <Link href="/signup" className="w-full px-5 py-3 rounded-xl flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary)] font-medium cursor-pointer touch-manipulation">SignUp</Link>
                        <Link href="/signin" className="w-full px-5 py-3 rounded-xl flex items-center justify-center border border-[var(--primary)] text-[var(--primary)] font-medium cursor-pointer touch-manipulation">Log In</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Page;