import prismadb from "@/lib/prismadb";
import fs from "fs";
import { writeFile } from 'fs/promises';
import { OrderItem } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: {orderId: string}}
) {
    try {
        if (!params.orderId){
            return new NextResponse("Product id is required", {  status: 400});
        }

        const order = await prismadb.order.findUnique({
            where: {
                id: params.orderId,
            },
            include: {
                store: true,
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
        
        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, orderId: string}}
) {
    try {
        const userId = "1234";
        const body = await req.json();

        const {
            orderItems,
            file,
        } = body;

        console.log("[ORDER_ID] ", params.orderId);
        // console.log("[BODY] ", body);

        // console.log("[FILE OUT] ", file)

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!orderItems || !orderItems.length) {
            return new NextResponse("Order items are required", {  status: 400});
        }

        if (!params.orderId) {
            return new NextResponse("Order id is required", {  status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {  status: 400});
        }

        // Save file in Prescription tab
        
        if (file) {
            console.log("[FILE_IN] ", file);

            // Enregistrez le fichier dans un répertoire
            // const prescription = await prismadb.prescription.upsert({
            //     where: {
            //         orderId: params.orderId,
            //     },
            //     update: {
            //         url: file,
            //     },
            //     create: {
            //         orderId: params.orderId,
            //         url: file,
            //     }
            // });

            // console.log(["PRESCRIPTION", prescription]);

            await prismadb.order.update({
                where: {
                    id: params.orderId,
                },
                data: {
                    storeId: params.storeId,
                    prescriptions: {
                        deleteMany: {}
                    },
                    orderItems: {
                        deleteMany: {}
                    },
                }
            });
    
            const orderItemData = orderItems.map((orderItem: {productId: string, quantity: number}) => {
                return {
                    productId: orderItem.productId,
                    quantity: orderItem.quantity
                    // Other fields that are part of OrderItem model
                };
            });
    
            const order = await prismadb.order.update({
                where: {
                    id: params.orderId,
                },
                data: {
                    prescriptions: {
                        create: {
                            url: file,
                        }
                    },
                    orderItems: {
                        createMany: {
                            data: orderItemData
                        }
                    }
                }
            });
            console.log("PRISMA_ORDER", order)
            return NextResponse.json(order);
        } else {

        // const storeByUserId = await prismadb.store.findFirst({
        //     where: {
        //         id: params.storeId,
        //         userId
        //     }
        // });

        // if (!storeByUserId) {
        //     return new NextResponse("Unauthorized", {  status: 403});
        // }

            await prismadb.order.update({
                where: {
                    id: params.orderId,
                },
                data: {
                    storeId: params.storeId,
                    orderItems: {
                        deleteMany: {}
                    },
                }
            });

            const orderItemData = orderItems.map((orderItem: {productId: string}) => {
                return {
                    productId: orderItem.productId
                    // Other fields that are part of OrderItem model
                };
            });

            const order = await prismadb.order.update({
                where: {
                    id: params.orderId,
                },
                data: {
                    orderItems: {
                        createMany: {
                            data: orderItemData
                        }
                    }
                }
            });
            return NextResponse.json(order);
        }
    } catch (error) {
        console.log('[ORDER_PATCH] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PUT (
    req: Request,
    { params }: { params: {storeId: string, orderId: string}}
) {
    try {
        const userId = "1234";
        const body = await req.json();

        const {
            action
        } = body;

        console.log("[ORDER_ID] ", body);
        // console.log("[BODY] ", body);

        // console.log("[FILE OUT] ", file)

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // if (action) {
        //     return new NextResponse("Order items are required", {  status: 400});
        // }

        if (!params.orderId) {
            return new NextResponse("Order id is required", {  status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {  status: 400});
        }

        const order = await prismadb.order.update({
            where: {
                id: params.orderId,
            },
            data: {
                status: action
            }
        });
        
        return NextResponse.json(order);
    } catch (error) {
        console.log('[STATUS_PUT] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};