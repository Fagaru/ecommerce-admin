"use client";

import Image from "next/image";

import Currency from "@/components/ui/currency";
// import { Product } from ".prisma/client";
// import { OrderItem } from "@prisma/client";

interface OrderViewPageProps {
    data: any
}

const OrderItemView: React.FC<OrderViewPageProps> = ({
    data
}) => {
    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image 
                    fill
                    src={data?.product?.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">
                            {data?.product?.name}
                        </p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data?.product?.color?.name}</p>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data?.product?.size?.name}</p>
                    </div>
                    <Currency value={data?.product?.price} />x {data.quantity}
                </div>
            </div>
        </li>
    );
}

export default OrderItemView;