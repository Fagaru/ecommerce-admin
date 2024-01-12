import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { StoreClient } from "./components/client";
import { StoreColumn } from "./components/columns";

const StoresPage = async ({
    params
}: {
    params: { userId: string }
}) => {
    const stores = await prismadb.store.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedStores: StoreColumn[] = stores.map((item) => ({
        id: item.id,
        name: item.name,
        userId: item.userId,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <StoreClient data={formattedStores}/>
            </div>
        </div>
    );
}

export default StoresPage;