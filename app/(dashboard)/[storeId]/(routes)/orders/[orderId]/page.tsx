import Image from "next/image";

import { getOrder } from "@/actions/get-order";
import Container from "@/components/ui/container";
import OrderItemView from "@/components/ui/order-item";
import Summary from "@/components/ui/summary";

import { CommandAlert } from "@/components/ui/command-alert";

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
                {/* {order?.status === "pending" &&
                    <div className="mt-2">
                        <CommandAlert description="La durée moyenne avant le désistement du client est estimée à 5 minutes. Cette commande s'annulera automatiquement au bout 6mns sans validation de votre part." title="Commande en attente de validation" variant="normal" storeId={order.storeId} orderId={params.orderId} />
                    </div>} */}

                    {(order?.status === "pending" && order?.state === "accepted") ?
                    <>
                    <div className="mt-2">
                        <CommandAlert description="La durée moyenne avant le désistement du client est estimée à 5 minutes. Cette commande s'annulera automatiquement au bout 6mns sans validation de votre part." title="Commande en attente de validation" variant="normal" storeId={order.storeId} orderId={params.orderId} />
                    </div>
                    </>
                    :
                    <></>}
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    
                    <h1 className="text-3xl font-bold">Review Order</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {orderItems?.length === 0 && 
                            <p className="text-neutral-500">No items added to cart</p>}
                            <ul>
                                {orderItems?.map((item: any) => (
                                    <OrderItemView
                                        key={item.productId}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-5 ">
                            <h2 className="text-md font-medium lg:ml-9 lg:mt-0 py-4 mt-6">
                                Prescription
                            </h2>
                        {order?.prescriptions &&
                        <div className="relative h-48 w-48 rounded-lg overflow-hidden sm:h-96 sm:w-96 lg:ml-9 lg:mt-0 lg:p-8">    
                            <Image 
                                fill
                                src={order?.prescriptions[0]?.url}
                                alt=""
                                className="object-cover object-center"
                            />
                        </div>}
                        <Summary items={orderItems} orderId={params.orderId} storeId={order?.storeId} state={order?.state} status={order?.status}  />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default OrderViewPage;