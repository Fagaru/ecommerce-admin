"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CalendarDays, FileTextIcon} from "lucide-react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"


import { OrderColumn } from "./columns";
import { Button } from "@/components/ui/button";

interface CellActionProps {
    data: OrderColumn;
}

export const DisplayDocument: React.FC<CellActionProps>= ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Order Id copied to the clipboard.")
    };

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link"><FileTextIcon /></Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-800">
                <div className="flex justify-between space-x-4">
                    <FileTextIcon />
                    <div className="space-y-1">
                        {data.prescription && (
                            // <h4 className="text-sm font-semibold">{data.prescription}</h4>
                            <iframe className="ml-500"
                                src={data.prescription}
                                title="Display File"
                                width="800"
                                height="600" 
                            />
                        )}
                        {/* <FileViewer fileType="pdf" filePath={data.prescription} /> */}
                        <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            Joined December 2021
                        </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>    
    );
};