"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BanIcon, Copy, Edit, Eye, HeartHandshake, MoreHorizontal, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import axios from "axios";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { OrderColumn } from "./columns";
import LoadingPage from "@/components/ui/loading";
import { Connection } from "@/hooks/webhook/connection";

interface CellActionProps {
    data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps>= ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState("");
    // const socket: any = useRef();
  
  // const socket: any = useRef();
    const socket: any = Connection();
    // console.log("Connection : ", connection);

    // useEffect(() => {
    //     // setSocket(io("ws://localhost:5000"));
    //     socket.current = io("ws://localhost:5000");
    // }, []);

    // useEffect(() => {
    //     // setSocket(io("ws://localhost:5000"));
    //     socket.current.emit("sendNotif", "Order validate");
    //     socket.current.on("getNotif", (message: any) => {
    //         console.log(message);
    //     });
    // }, []);

    const onActions = async () => {
        try {
            setLoading(true);
            if (action == "validate") {
                const state = "accepted";
                await axios.patch(`/api/${params.storeId}/orders/${data.id}/state`, {state});
                router.push(`/${params.storeId}/orders/${data.id}`);
                router.refresh();
                toast.success("Order in preparation.");
                // socket.current.emit("sendNotif", {
                //         senderId: "1234",
                //         status: "valide",
                //         message: "Order validate"
                //     });

                socket.emit("sendNotif", {
                    senderId: "1234",
                    status: "valide",
                    message: "Order validate"
                });
                // socket.current.on("getNotif", (message: any) => {
                //     console.log(message);
                // });
            } else if (action == "decline"){
                const state = "denied"
                await axios.patch(`/api/${params.storeId}/orders/${data.id}/state`, {state});
                router.refresh();
                toast.success("Order closed.");
                // socket.current.emit("sendNotif", {
                //     senderId: "1234",
                //     status: "decline",
                //     message: "Order decline"
                // });
                socket.emit("sendNotif", {
                    senderId: "1234",
                    status: "decline",
                    message: "Order decline"
                });
                // socket.current.emit("sendNotif", "Order decline");
                // socket.current.on("getNotif", (message: any) => {
                //     console.log(message);
                // });
            } else if (action == "ready"){
                const status = "ready"
                await axios.patch(`/api/${params.storeId}/orders/${data.id}/status`, {status});
                router.refresh();
                toast.success("Order ready. A delivery person will pick up the order.");
                // socket.current.emit("sendNotif", {
                //     senderId: "1234",
                //     status: "ready",
                //     message: "Order ready"
                // });
                socket.emit("sendNotif", {
                    senderId: "1234",
                    status: "ready",
                    message: "Order ready"
                });
                // socket.current.emit("sendNotif", "Order ready");
                // socket.current.on("getNotif", (message: any) => {
                //     console.log(message);
                // });
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onValidation = () => {
        setAction("validate");
        setOpen(true);
        toast("You will no longer be able to edit this order after this action.");  
    }

    const onDecline = () => {
        setAction("decline");
        setOpen(true);
    }

    const onReady = () => {
        setAction("ready");
        setOpen(true);
    }

    return loading ? (<LoadingPage />)
            :  (
                <>
                    <AlertModal 
                            isOpen={open}
                            onClose={() => setOpen(false)}
                            onConfirm={onActions}
                            loading={loading}
                    />
                    {data.state =="pending" &&
                        <div className="flex items-center">
                            <Button variant="destructive" size="sm" onClick={onDecline} className="ml-20 mr-5 ">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Decline
                            </Button>
                            <Button size="sm" onClick={onValidation}>
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Validate
                            </Button>
                        </div>}
                    {data.status == "in preparation" && data.state == "accepted" &&
                        <div className="flex items-center">
                            <Button variant="destructive" size="sm" onClick={onDecline} className="ml-20 mr-5 ">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Cancel
                            </Button>
                            <Button size="sm" onClick={onReady}>
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Ready
                            </Button>
                        </div>}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Id
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/${params.storeId}/orders/${data.id}`, '_blank')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`/${params.storeId}/orders/${data.id}/form`, '_blank')}>
                                <Edit className="mr-2 h-4 w-4" />
                                Update
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </>
            );
};