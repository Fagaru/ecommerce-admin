"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
// import { OrderItem } from "@prisma/client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface SummaryProps {
    items: any[] | undefined,
    orderId: string | undefined,
    storeId: string | undefined,
    status: string | undefined,
    state: string | undefined
}

const Summary: React.FC<SummaryProps> = ({
    items,
    orderId,
    storeId,
    status,
    state
}) => {
    const router = useRouter();
    const totalPrice = items?.reduce((total, item) => {
        return total + Number(item.product.price)*Number(item.quantity)
    }, 0);

    return (
        <div
            className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:mt-0 lg:p-8"
        >
            <h2 className="text-lg font-medium">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium">
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items?.length === 0 || status !== "pending" || state !== "accepted"} onClick={() => router.push(`/${storeId}/orders/${orderId}/form`)} className="w-full mt-6">
                <Edit className="mr-2" /> 
                <span>Edit</span>
            </Button>
        </div>
    );
}

export default Summary;