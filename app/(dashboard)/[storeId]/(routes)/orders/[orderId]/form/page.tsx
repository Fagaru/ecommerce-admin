import prismadb from "@/lib/prismadb";

import UpdateOrderForm from "./components/order-form";

const OrderFormPage = async ({
    params
}: {
    params: {orderId: string, storeId: string}
}) => {
    const order = await prismadb.order.findUnique({
        where: {
            id: params.orderId,
        },
        include: {
            store: true,
            prescriptions: true,
            orderItems: {
                include: {
                    product: {
                        include: {
                            images: true,
                        }
                    }
                }
            }
        }
    });

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            images: true,
            color: true,
            size: true,
        }
    });



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <UpdateOrderForm 
                    initialData={order}
                    products={products}
                />
            </div>
        </div>
    );
}

export default OrderFormPage;