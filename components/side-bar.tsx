"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Album, AreaChart, Home, Menu, Monitor, Package, Palette, Ruler, Settings, ShoppingCart, Target, TrendingUp, User } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

export function SideBar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const navRef = useRef<any>();
    const [isHide, setIsHide] = useState<any>({one: "hidden lg:flex", two:"lg:hidden"});
    const [screenSize, setScreenSize] = useState<any>({width: window.innerWidth});

    const showSideBar = () => {
        if (screenSize.width > 1023 &&  isHide.one === "hidden lg:flex") {
            setIsHide({one: "hidden", two:""});
        } else if (screenSize.width < 1024 &&  isHide.one === "hidden lg:flex") {
            setIsHide({one: "", two:"hidden"});
        } else {
            if (isHide.one === "hidden" || isHide.two === "") {
                setIsHide({one: "", two:"hidden"});
            } else {
                setIsHide({one: "hidden", two:""});
            }
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({width: window.innerWidth});
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        

    }, [screenSize]);
    return (
        <>
        <div className="relative">
    <nav
        className={cn(`flex flex-col gap-3 w-[230px] border-solid border-r-[2px] p-1 ${isHide.one} `, className)}
        ref={navRef}
        // hidden={isHide}
    >
        <Button variant="ghost" size="sm" className="w-[100px] gap-3" onClick={showSideBar} >
            <Menu />
            <span className="text-sm/[30px]">STORE</span>
        </Button>
        <div className="pl-2">
            <div className="gap-3 mb-5">
                <span className="text-xs font-extralight">MAIN</span>
                <Link 
                    key={`/${params.storeId}/home`}
                    href={`/${params.storeId}/home`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/home`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Home size="20px" />
                    <span className="text-sm/[20px]">Home</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/profile`}
                    href={`/${params.storeId}`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <User size="20px" />
                <span className="text-sm/[20px]">Profile</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/Settings`}
                    href={`/${params.storeId}/settings`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/settings`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Settings size="20px" />
                <span className="text-sm/[20px]">Settings</span>
                </Link>
            </div>
            <div className="gap-3 mb-5">
                <span className="text-xs font-extralight">LISTS</span>
                <Link 
                    key={`/${params.storeId}/orders`}
                    href={`/${params.storeId}/orders`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/orders`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <ShoppingCart size="20px"/>
                    <span className="text-sm/[20px]">Orders</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/products`}
                    href={`/${params.storeId}/products`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/products`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Package size="20px"/>
                <span className="text-sm/[20px]">Products</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/categories`}
                    href={`/${params.storeId}/categories`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/categories`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Target size="20px"/>
                <span className="text-sm/[20px]">Categories</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/billboards`}
                    href={`/${params.storeId}/billboards`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/billboards`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Album size="20px"/>
                <span className="text-sm/[20px]">Billboard</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/colors`}
                    href={`/${params.storeId}/colors`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/colors`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Palette size="20px"/>
                <span className="text-sm/[20px]">Colors</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/sizes`}
                    href={`/${params.storeId}/sizes`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}/sizes`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Ruler size="20px"/>
                <span className="text-sm/[20px]">Sizes</span>
                </Link>
            </div>
            <div className="gap-3 mb-5">
                <span className="text-xs font-extralight">ANALYTICS</span>
                <Link 
                    key={`/${params.storeId}/charts`}
                    href={`/${params.storeId}`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <AreaChart size="20px"/>
                    <span className="text-sm/[20px]">Charts</span>
                </Link>
                <Link 
                    key={`/${params.storeId}/activity`}
                    href={`/${params.storeId}`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <Monitor size="20px"/>
                <span className="text-sm/[20px]">Activity monitoring</span>
                </Link>
            </div>
            <div className="gap-3 mb-5">
                <span className="text-xs font-extralight">PRO</span>
                <Link 
                    key={`/${params.storeId}/pro`}
                    href={`/${params.storeId}`}
                    className={cn(
                        "flex items-center gap-3 p-[10px] rounded-[5px] transition-colors hover:bg-cyan-500 dark:hover:bg-teal-800 ",
                        (pathname === `/${params.storeId}`) ? "bg-cyan-500 text-sky-950 dark:bg-teal-800 dark:text-white" : "text-muted-foreground"
                    )}
                >
                <TrendingUp size="20px"/>
                    <span className="text-sm/[20px]">Check offers</span>
                </Link>
            </div>
        </div>
        
    </nav>
    <Button variant="ghost" size="sm" onClick={showSideBar} className={`${isHide.two} m-1 transition-all duration-500`}>
        <Menu />
    </Button>
    </div>
    </>
    )
};