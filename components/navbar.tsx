import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";

import UserAccount from "@/components/user-account";
import { Bell, Settings, Settings2 } from "lucide-react";
import Notification from "@/components/notification";
import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";

const Navbar = async () => {
    const userId = {id: "1234", name:"Dev"};

    // redirection vers le login si non connecté

    const stores = await prismadb.store.findMany({
        where: {
            userId: userId.id
        }
    })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                <StoreSwitcher items={stores}/>
                </div>
                {/* <MainNav className="mx-6" /> */}
                <MapBoxApiKeyWrapper />
                <div className="ml-auto flex items-center space-x-4">
                    {/* <Bell /> */}
                    <Notification />
                    <ThemeToggle />
                    <UserAccount 
                        user={userId}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;