// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        // const { userId } = auth();
        const userId = "1234";
        const body = await req.json();

        const { name } = body;
        console.log("[USERID] ", userId);

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", {  status: 400});
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_POST] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const stores = await prismadb.store.findMany({});

        return NextResponse.json(stores);
    } catch (error) {
        console.log('[STORES_GET] ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}