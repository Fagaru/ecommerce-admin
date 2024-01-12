"use client";

import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";

import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return (
        <>
            <Heading
                title={`Pending orders (${data.length})`}
                description="You have 15 minutes before cancelling an order."
            />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    );
}