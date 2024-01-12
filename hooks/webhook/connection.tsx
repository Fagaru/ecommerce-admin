"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const Connection = () => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        setSocket(io("ws://localhost:5000"));
    }, []);

    return socket;
 }