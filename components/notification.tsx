"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { 
    Bell,
    ShoppingCart, 
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";

import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import useNotification from "@/hooks/use-notification";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface UserAccountProps extends PopoverTriggerProps {
    // user: any;
};

export default function Notification({
    // user
}: UserAccountProps) {
    const params = useParams();
    const router = useRouter();

    const notifications = useNotification();

    const [open, setOpen] = useState(false);
    const [arrivalNotification, setArrivalNotification] = useState<any>();
    const socket: any = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        // blocNotif.removeAll();
        socket.current.on("getNotif", (notification: any) => {
            setArrivalNotification({
                id: uuidv4(),
                senderId: notification.senderId,
                status: notification.status,
                message: notification.message,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        // arrivalNotification && setNotifications((prev: any) => [...prev, arrivalNotification]);
        // console.log("Notifications : ", notifications);
        if (arrivalNotification) {
            notifications.addItem({
                id: arrivalNotification.id,
                senderId: arrivalNotification.senderId,
                status: arrivalNotification.status,
                message: arrivalNotification.message,
                createdAt: arrivalNotification.createdAt
            });
        }

    }, [arrivalNotification]);

    console.log("Arrival Notifications out effect : ", arrivalNotification);
    const items = notifications.items;
    console.log("useNotification", items);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='relative'>
                        <Button variant="ghost" className="h-8 w-8 p-0" key="notifications">
                        {(notifications.items.length > 0) &&
                            <span className="absolute flex h-[20px] w-[20px] bg-red-500 text-white text-sm top-[-5px] left-[15px] z-50 items-center justify-center rounded-full" key="nb_notifs">{notifications.items.length}</span>}
                            <Bell />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Notifications
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {notifications.items.map((notification: any) => (
                            <>
                            {(notification.status ==="valide") &&
                            <DropdownMenuItem className="bg-yellow-500 mb-1">
                            
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span key={notification.id}>{notification.message}</span>
                            </DropdownMenuItem>}
                            {(notification.status ==="decline") &&
                            <DropdownMenuItem className="bg-red-500 mb-1">
                            
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span key={notification.id}>{notification.message}</span>
                            </DropdownMenuItem>}
                            {(notification.status ==="ready") &&
                            <DropdownMenuItem className="bg-sky-500 mb-1">
                            
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span key={notification.id}>{notification.message}</span>
                            </DropdownMenuItem>}
                            </>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};