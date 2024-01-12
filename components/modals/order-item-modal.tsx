"use client";

import { toast } from "react-hot-toast";
import Select from "react-select";
import { OrderItem, Product } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
    products: ProductProps[];
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    setOrderItemsSelected: React.Dispatch<React.SetStateAction<ProductProps[]>>;
    orderItems: OrderItemsProps[];
}

export const OrderItemModal: React.FC<OrderItemProps> = ({
    products,
    isOpen,
    onClose,
    loading,
    setOrderItemsSelected,
    orderItems
}) => {
    const optionsProduct: any = [];
    const currentProduct = new Set()
    const [isSelected, setIsSelected] = useState<ProductProps[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


   
    products.map((product) => {
        optionsProduct.push({
            value: product.id,
            label: product.name
        })
    });

    orderItems.map((item) => {
        currentProduct.add(
            item.productId,
        )
    });

    const options = optionsProduct.filter((item: any) => !currentProduct.has(item.value))


    const handleChange = async (selected: any) => {
        var s = new Set();
        selected.map((product: any) => {
            s.add(product.value)
        })
        const selectedItems = products.filter((item) => s.has(item.id));
        setIsSelected(selectedItems);
      };

    const onConfirm = async(selected: any) => {
        try {
            if (selected){
                setOrderItemsSelected(isSelected);
                toast("Products added.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            onClose();
        }
    }

    return (
        <Modal
            title="Add Product"
            description="Add products to order"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Select
                    id="selectWarna"
                    instanceId="selectWarna"
                    isMulti
                    name="colors"
                    className="basic-multi-select dark:text-black"
                    classNamePrefix="select"
                    options={options}
                    onChange={handleChange}
                    placeholder="Search products..."
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={loading}
                        variant="outline"
                        onClick={onClose}>
                            Cancel
                    </Button>
                    <Button disabled={loading} variant="default" onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </div>
        </Modal>
    );
};