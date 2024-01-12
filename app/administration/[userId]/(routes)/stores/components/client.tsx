"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { StoreColumn, columns } from "./columns";

interface StoreClientProps {
    data: StoreColumn[]
}

export const StoreClient: React.FC<StoreClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Stores (${data.length})`}
                    description="Manage stores"
                />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Stores" />
            <Separator />
            <ApiList entityName="stores" entityIdName="storeId"/>
        </>
    );
}