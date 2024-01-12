import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, orderId: string}},
) {
    try {

        const body = await req.json();

        const {
            status
        } = body;

        // console.log("STATUS INSIDE ROUTE", status)
    const order = await prismadb.order.update({
        where: {
            id: params.orderId,
        },
        data: {
            status: status,
        }
    });

    return NextResponse.json(order);
    } catch (error) {
        console.log('[STATUS_UPDATE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};