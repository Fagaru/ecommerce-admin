"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { Minus, Plus, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Product, OrderItem } from ".prisma/client";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useEffect, useState } from "react";

interface ProductProps {
    id: string;
    name: string;
    storeId: string;
    categoryId: string; 
    price: any; 
    images : {
        url : string
    }[] | undefined;
    isFeatured: boolean; 
    isArchived: boolean; 
    sizeId: string; 
    size: {
        name: string;
    } | undefined;
    colorId: string; 
    color: {
        name: string;
    } | undefined;
    createdAt: Date; 
    updatedAt: Date;
}

interface OrderItemsProps { 
    id: string;
    orderId: string; 
    productId: string;
    product: ProductProps;
    quantity: number;
}

interface OrderItemProps {
    data: OrderItemsProps;
    orderItems: OrderItemsProps[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItemsProps[]>>;
};

const OrderUpdateItem: React.FC<OrderItemProps> = ({
    data, orderItems, setOrderItems
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    // const stopPropagation: MouseEventHandler<HTMLButtonElement> = (event) => {
    //     event.stopPropagation();
    // }

    const onRemove = () => {
        const pos = orderItems.findIndex((item) => item.productId === data.productId);
        const updatedOrderItems = [...orderItems];
        updatedOrderItems.splice(pos, 1);
        setOrderItems(updatedOrderItems); // Update orderItems using setOrderItems
        toast.success("Item removed from the cart.");
    }

    const PlusQuantity = (itemId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        // stopPropagation;
        event.preventDefault();
        event.stopPropagation();
        const item = orderItems.find((item) => item.id === itemId) as OrderItemsProps;
        item.quantity += 1;
        const updatedOrderItems = [...orderItems];
        setOrderItems(updatedOrderItems); // Update orderItems using setOrderItems
        toast.success("Quantity updated.");
    }

    const MinusQuantity = (itemId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        // stopPropagation;
        event.preventDefault();
        event.stopPropagation();
        const item = orderItems.find((item) => item.id === itemId) as OrderItemsProps;
        item.quantity -= 1;
        if (item.quantity === 0) {
            onRemove();
        } else {
            const updatedOrderItems = [...orderItems];
            setOrderItems(updatedOrderItems); // Update orderItems using setOrderItems
            toast.success("Quantity updated.");
        }
    }

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image 
                    fill
                    src={data.product.images ? (data.product.images[0]?.url || "") : ""}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} className="dark:text-black" />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black dark:text-white">
                            {data?.product?.name}
                        </p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data?.product?.color?.name}</p>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data?.product?.size?.name}</p>
                    </div>
                    <Currency value={data?.product?.price} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="mb-5 flex">
                        <p className="text-lg text-blue ml-0 mt-1">
                            quantity
                        </p>
                        <Button className="ml-10" onClick={(e) => MinusQuantity(data.id, e)} size="sm">
                            <Minus size={15}/>
                        </Button>
                        <div className="ml-10 mt-2">{data?.quantity}</div>
                        <Button className="ml-10" onClick={(e) => PlusQuantity(data.id, e)} size="sm">
                            <Plus  size={15}/>
                        </Button>
                        
                    </div>
                </div>
            </div>
        </li>
    );
}

export default OrderUpdateItem;