
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { InBoxProvider } from "@/providers/inbox-provider";
import { SideBar } from "@/components/side-bar";


export default async function DashboardLayout({
   children,
   params 
} : {
    children: React.ReactNode;
    params: {storeId: string}
}) {
    // const { userId } = auth();
    const userId = "1234";

    // if (!userId) {
    //     redirect('/sign-in');
    // }
  

    
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <SideBar />
                <div className="w-full">
                    {children}
                    <InBoxProvider params={params} />
                </div>
            </div>
        </>
    );
}