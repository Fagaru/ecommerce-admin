import prismadb from "@/lib/prismadb";

export const getOrders = async (storeId: string, state: string, status: string) => {
    const order = await prismadb.order.findMany({
        where: {
            storeId: storeId,
            state: state,
            status: status
        },
        include: {
            prescriptions: true,
            orderItems: {
                include: {
                    product: {
                        include: {
                            images: true,
                            category: true,
                            size: true,
                            color: true
                        }
                    },
                }
            } 
         }
    });

    return order;
};