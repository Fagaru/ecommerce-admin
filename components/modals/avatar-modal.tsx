"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface AvatarModalProps {
    // isOpen: boolean;
    // onClose: () => void;
    // loading: boolean;
    params: {
        name: string,
    }
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
    // isOpen,
    // onClose,
    // loading,
    params
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{params.name}</AvatarFallback>
        </Avatar>
    )
}

export default AvatarModal;
