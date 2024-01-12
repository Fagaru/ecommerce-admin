import prismadb from "@/lib/prismadb";

export const getOrder = async (orderId: string) => {
    const order = await prismadb.order.findUnique({
        where: {
            id: orderId,
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