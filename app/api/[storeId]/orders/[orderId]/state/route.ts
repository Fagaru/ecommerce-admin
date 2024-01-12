import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, orderId: string}},
) {
    try {

        const body = await req.json();

        const {
            state
        } = body;

        // console.log("STATUS INSIDE ROUTE", status)
    const order = await prismadb.order.update({
        where: {
            id: params.orderId,
        },
        data: {
            state: state,
        }
    });

    return NextResponse.json(order);
    } catch (error) {
        console.log('[STATE_UPDATE] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};