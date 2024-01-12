"use client";

import { Ban, BanIcon, Copy, HeartHandshake, Info, Plus, Server, ShieldAlert, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { boolean } from "zod";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "normal" | "urgent" | "return";
    storeId: string;
    orderId: string
};

const textMap:Record<ApiAlertProps["variant"], string> = {
    normal: "Normal",
    return: "Return",
    urgent: "Admin"
};

const variantMap:Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    normal: "secondary",
    return: "outline",
    urgent: "destructive"
};

export const CommandAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "normal",
    storeId,
    orderId
}) => {
    const router = useRouter();
    const params = useParams();
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(true);

    const onActions = async () => {
        try {
            setLoading(true);
            if (action) {
                const status = "in preparation"
                await axios.patch(`/api/${storeId}/orders/${orderId}/status`, {status, orderId, storeId});
                router.refresh();
                toast.success("Order in preparation.");
            } else {
                const status = "denied"
                await axios.patch(`/api/${storeId}/orders/${orderId}/status`, {status, orderId, storeId});
                router.refresh();
                toast.success("Order closed.");
            }
            
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onValidation = () => {
        setAction(true);
        setOpen(true);
        toast("You will no longer be able to edit this order after this action.")
    }

    const onDecline = () => {
        setAction(false);
        setOpen(true);
        toast("Order denied.")
    }
    return (
        <>
            <AlertModal 
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    onConfirm={onActions}
                    loading={loading}
            />
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <div className="flex items-center">
                    <Button variant="destructive" size="sm" onClick={onDecline} className="ml-20 mr-5 " disabled={loading}>
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Decline
                    </Button>
                    <Button size="sm" onClick={onValidation} disabled={loading}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Validate
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
        </>
    )
}