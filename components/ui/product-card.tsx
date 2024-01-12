"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product, OrderItem } from ".prisma/client";

import Currency from "@/components/ui/currency";

interface ProductCard {
    data: any;
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const router = useRouter();

    return (
        <div className="group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image 
                    src={data.images?.[0]?.url} 
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        {/* */}
                    </div>
                </div> 
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name} 
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justity-between">
                <Currency value={data?.price} />
            </div>
        </div>
    );
}

export default ProductCard;