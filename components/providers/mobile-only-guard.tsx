"use client";

export default function MobileOnlyGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Mobile application: visible up to 500px */}
            <div className="min-[501px]:hidden">
                {children}
            </div>

            {/* Desktop restriction: visible above 500px */}
            <div className="hidden min-[501px]:fixed min-[501px]:inset-0 min-[501px]:z-[999999] min-[501px]:flex min-[501px]:items-center min-[501px]:justify-center min-[501px]:bg-[var(--background)] min-[501px]:px-6 min-[501px]:text-[var(--foreground)]">

                <div className="w-full max-w-[420px] text-center">

                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border border-[var(--border)] bg-[var(--card)] text-[var(--primary)]">

                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="7"
                                y="2"
                                width="10"
                                height="20"
                                rx="2"
                            />
                            <path d="M11 18h2" />
                        </svg>

                    </div>

                    {/* Heading */}
                    <h1 className="mb-3 text-[25px] font-semibold tracking-tight">
                        Mobile Experience Only
                    </h1>

                    {/* Description */}
                    <p className="text-sm leading-[1.7] text-[var(--muted)]">
                        Versity Sports is designed specifically for
                        mobile devices to give you the best possible
                        experience.
                    </p>

                    {/* Hint */}
                    <p className="mt-5 text-sm font-medium text-[var(--primary)]">
                        Please open this platform on your smartphone
                        to continue.
                    </p>

                </div>
            </div>
        </>
    );
}