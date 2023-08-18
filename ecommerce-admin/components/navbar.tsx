import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const userId = "1234";

    // redirection vers le login si non connecté

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                <StoreSwitcher items={stores}/>
                </div>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                ok
                </div>
            </div>
        </div>
    );
}

export default Navbar;