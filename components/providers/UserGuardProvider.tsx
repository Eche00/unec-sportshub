"use client";

import { UseUserGuard } from "@/hooks/useUserGuard";


export default function UserGuardProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    UseUserGuard();

    return <>{children}</>;
}