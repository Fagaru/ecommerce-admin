
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import NavbarAdmin from "@/components/navbar-admin";

export default async function AdministrationLayout({
   children,
   params 
} : {
    children: React.ReactNode;
    params: {userId: string}
}) {
    // const { userId } = auth();
    const userId = "1234";
    // if (!userId) {
    //     redirect('/sign-in');
    // }

    
    // const store = await prismadb.store.findFirst({
    //     where: {
    //         id: params.storeId,
    //         userId
    //     }
    // });

    // if (!store) {
    //     redirect('/');
    // }

    return (
        <>
            <NavbarAdmin />
            {/* <Connection /> */}
            {children}
        </>
    );
}