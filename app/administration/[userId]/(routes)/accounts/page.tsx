
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { UserClient } from "./components/client";
import { UserColumn } from "./components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserData {
    id: string;
    name: string;
    isAdmin: boolean;
    isMerchant: boolean;
    isDriver: boolean;
    isCustomer: boolean,
    createdAt: string;
};

const UserPage = async ({
    params
}: {
    params: { userId: string }
}) => {
    // const categories = await prismadb.category.findMany({
    //     where: {
    //         storeId: params.storeId
    //     },
    //     include: {
    //         billboard: true,
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // });

    const users: UserData[] =[
        {
            id: "1234",
            name: "Sam",
            isAdmin: true,
            isMerchant: false,
            isDriver: false,
            isCustomer: false,
            createdAt: ""
        },
        {
            id: "4321",
            name: "Esteban",
            isAdmin: false,
            isMerchant: true,
            isDriver: false,
            isCustomer: false,
            createdAt: ""
        },
        {
            id: "2341",
            name: "Ryo",
            isAdmin: false,
            isMerchant: false,
            isDriver: true,
            isCustomer: false,
            createdAt: ""
        },
        {
            id: "3124",
            name: "Ken",
            isAdmin: false,
            isMerchant: false,
            isDriver: false,
            isCustomer: true,
            createdAt: ""
        },
    ];

    const formattedUsers: UserColumn[] = users.map((item) => ({
        id: item.id,
        name: item.name,
        isAdmin: item.isAdmin,
        isMerchant: item.isMerchant,
        isDriver: item.isDriver,
        isCustomer: item.isCustomer,
        createdAt: item.createdAt
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="sellers">Sellers</TabsTrigger>
                        <TabsTrigger value="delivery-drivers">Delivery Drivers</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sellers">
                        <UserClient data={formattedUsers}/>
                    </TabsContent>
                    <TabsContent value="delivery-drivers">
                        <UserClient data={formattedUsers}/>
                    </TabsContent>
                    <TabsContent value="customers">
                        <UserClient data={formattedUsers}/>
                    </TabsContent>
                </Tabs>
                
            </div>
        </div>
    );
}

export default UserPage;