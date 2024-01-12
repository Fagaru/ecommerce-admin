import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            prescriptions: true,
            orderItems: {
                include: {
                    product: true
                }
            } 
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        prescription: item.prescriptions.map((prescription) => prescription.url).join(', '),
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)*Number(item.quantity)
        }, 0)),
        isPaid: item.isPaid,
        state: item.state,
        status: item.status,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    //prescription.url.split('/')[prescription.url.split('/').length - 1]

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}/>
            </div>
        </div>
    );
}

export default OrdersPage;