
import { getOrders } from "@/actions/get-orders";


import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import DraggableInbox from "@/components/ui/inbox-draggable";

export const InBoxProvider = async ({
    params
}: {
    params: { storeId: string }
}) => {
    console.log("Params", params);
    const ordersState = await getOrders(params.storeId, "pending", "pending");
    const ordersInPreparation = await getOrders(params.storeId, "accepted", "in preparation");
    const ordersReady = await getOrders(params.storeId, "accepted", "ready");

    const formattedOrdersState = ordersState.map((item) => ({
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
    const formattedOrdersInPreparation = ordersInPreparation.map((item) => ({
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
    const formattedOrdersReady = ordersReady.map((item) => ({
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

    return (
        <div className="relative z-10 flex items-center justify-end mr-5 mt-5">
            <DraggableInbox formattedOrdersState={formattedOrdersState} formattedOrdersInPreparation={formattedOrdersInPreparation} formattedOrdersReady={formattedOrdersReady}/>
        </div>
    )
};
