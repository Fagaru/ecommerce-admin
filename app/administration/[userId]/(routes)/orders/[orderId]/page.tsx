// "use client";

import { getOrder } from "@/actions/get-order";
import Container from "@/components/ui/container";
import OrderItemView from "@/components/ui/order-item";
import Summary from "@/components/ui/summary";

export const revalidate = 0;

interface OrderViewPageProps {
    params: {
        orderId: string;
    }
}

const OrderViewPage: React.FC<OrderViewPageProps> = async ( {
    params
}) => {
    const order = await getOrder(params.orderId);

    const orderItems = order?.orderItems;

    return (
        <div className="">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Review Order</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {orderItems?.length === 0 && 
                            <p className="text-neutral-500">No items added to cart</p>}
                            <ul>
                                {orderItems?.map((item) => (
                                    <OrderItemView
                                        key={item.productId}
                                        data={item.product}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary items={orderItems} orderId={order?.id} storeId={order?.storeId} status={order?.status} state={order?.state} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default OrderViewPage;