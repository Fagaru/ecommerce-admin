import prismadb from "@/lib/prismadb";

// export const putStatusOrder = async (orderId?: string, action?: string) => {
//     const order = await prismadb.order.update({
//         where: {
//             id: orderId,
//         },
//         status: action
//     });

//     return order;
// };