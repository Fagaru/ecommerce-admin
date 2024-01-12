"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNavAdmin({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/administration/${params.userId}`,
            label: 'Overview',
            active: pathname === `/administration/${params.userId}`

        },
        {
            href: `/administration/${params.userId}/stores`,
            label: 'Stores',
            active: pathname === `/administration/${params.userId}/stores`

        },
        {
            href: `/administration/${params.userId}/accounts`,
            label: 'Accounts',
            active: pathname === `/administration/${params.userId}/users`
        },
        {
            href: `/administration/${params.userId}/orders`,
            label: 'Orders',
            active: pathname === `/administration/${params.userId}/orders`

        },
        {
            href: `/administration/${params.userId}/deliveries`,
            label: 'Deliveries',
            active: pathname === `/administration/${params.userId}/deliveries`

        },
        {
            href: `/administration/${params.userId}/settings`,
            label: 'Settings',
            active: pathname === `/administration/${params.userId}/settings`

        }
    ];

    return (
    <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
        {routes.map((route) => (
            <Link
                key={route.href}
                href= {route.href}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                )}
            >
                {route.label}
            </Link>
        ))}

    </nav>
    )
};