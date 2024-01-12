import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

interface UserData {
    id: string
    name: string
    isAdmin: boolean
    isMerchant: boolean
    isDriver: boolean
    isCustomer: boolean
};

export default async function SetupLayout({
   children,
} : {
    children: React.ReactNode;
}) {
    // const { userId } = auth();
    const user: UserData ={
        id: "1234",
        name: "Sam",
        isAdmin: true,
        isMerchant: false,
        isDriver: false,
        isCustomer: false,
    };

    // if (!userId) {
    //     redirect('/sign-in');
    // }

    // const store = await axios.get('https://fagaru.onrender.com/api/products/getById/64cea0808c2d65cf2d28cc73');
    const store = await prismadb.store.findFirst({
        where: {
            userId: user.id
        }
    });
 
    if (store && user.isMerchant) {
        redirect(`/${store.id}`);
    }
    if (user.isAdmin) {
        redirect(`/administration/${user.id}`);
    }

    return (
        <>
            {children}
        </>
    );
};