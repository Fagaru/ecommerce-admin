"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

const LoadingPage = () => {
    const [isMounted, SetIsMounted] = useState(false);

    useEffect(() => {
        SetIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export default LoadingPage;