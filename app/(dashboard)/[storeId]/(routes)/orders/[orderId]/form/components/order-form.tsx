"use client";

import { 
    Order, 
    OrderItem, 
    Product, 
} from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Plus, SendHorizonal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OrderUpdateItem from "./order-update-item";
import { OrderItemModal } from "@/components/modals/order-item-modal";
import ImageUpload from "@/components/ui/image-upload";
import Currency from "@/components/ui/currency";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPage from "@/components/ui/loading";


interface Store {
    name: string;
    id: string;
}

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

interface InitialDataProps { 
    id: string; 
    clientId: string; 
    store: Store; 
    storeId: string; 
    isPaid: boolean; 
    state: string; 
    status: string; 
    phone: string; 
    address: string; 
    prescriptions: {
        url: string
    }[];
    orderItems: OrderItemsProps[];
    createdAt: Date; 
    updatedAt: Date; 
}

const productSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
});

const orderItemSchema = z.object({
  product: productSchema
});

const formSchema = z.object({
    isPaid: z.boolean(),
    phone: z.string(),
    address: z.string(),
    storeId: z.string(),
    store: z.object({
      name: z.string(),
      id: z.string()
    }),
    file: z.string(),
    orderItems: z.array(orderItemSchema),
  });

type OrderValuesProps = z.infer<typeof formSchema>;

interface OrderFormProps {
    initialData: any | null;
    products: ProductProps[];
}

const UpdateOrderForm: React.FC<OrderFormProps> = ({
  initialData,
  products
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderItems, setOrderItems] = useState<OrderItemsProps[]>([]);
    const [orderItemsSelected, setorderItemsSelected] = useState<ProductProps[]>([]);

    // const [selectedFile, setSelectedFile] = useState<File>();
	// const [isSelected, setIsSelected] = useState(false);

    const title = initialData ? "Edit order" : "Create order";
    const description = initialData ? "Edit order" : "Add a new order";
    const toastMessage = initialData ? "Order updated" : "Order created";
    const action = initialData ? "Send to customer" : "Create";

    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if (!isMounted) {
    //     return null;
    // }

    const form = useForm<OrderValuesProps>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData as InitialDataProps,
    });

    useEffect(() => {
        if (initialData) {
            if (orderItems.length <= 0) {
                setOrderItems(initialData.orderItems);
            }
        }

        if (orderItemsSelected.length > 0) {
            const selectedItems: OrderItemsProps[] = [];
            orderItemsSelected.map((item) => {
                selectedItems.push({id: "", orderId: params.orderId as string, productId: item.id, product: item as ProductProps, quantity: 1});
            })

            const newProducts = Array.from(new Set( orderItems.concat(selectedItems) ) );
            setOrderItems(newProducts)
            setorderItemsSelected([]);
        }
    }, [initialData, orderItemsSelected]);

    const totalPrice = orderItems.reduce((total, item) => {
        return total + Number(item.product.price)*Number(item.quantity)
    }, 0);


    const onSubmit = async (values: OrderValuesProps) => {
        try {
            setLoading(true);

            if (orderItems){
                values.orderItems = orderItems as any;
                await axios.patch(`/api/${params.storeId}/orders/${params.orderId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/products`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/orders/${params.orderId}`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            // setLoading(false);
        }
    };

    return loading ? 
        (<LoadingPage />)
        : (
        <>
            <OrderItemModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
                products={products}
                setOrderItemsSelected={setorderItemsSelected}
                orderItems={orderItems}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                <div className="text-base font-medium">
                    Order Total
                </div>
                <Currency value={totalPrice} />

                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add product
                </Button>
            </div>
            <Separator />
            <Form {...form}>
            {/* form.handleSubmit(onSubmit) */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
                        { orderItems.map((item: OrderItemsProps) => 
                            <OrderUpdateItem data={item} key={item.productId} orderItems={orderItems} setOrderItems={setOrderItems} />
                        )}
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
                        <FormField 
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} placeholder="06 51 45 74 21" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                               <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} placeholder="13 rue jean Laplace" {...field} />
                                    </FormControl>
                                    <FormMessage />
                               </FormItem>
                            )}
                        />
                        <FormField 
                                control={form.control}
                                name="store"
                                render={({ field }) => (
                                <FormItem>
                                        <FormLabel>Store</FormLabel>
                                        <FormControl>
                                            <Input disabled={true} placeholder="No store name" value={initialData?.store.name} />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                                )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prescription</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                            value={field.value ? [field.value] : []}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={(url) => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto mr-auto" type="submit">
                        <SendHorizonal className="mr-2" />
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
  
export default UpdateOrderForm;
  