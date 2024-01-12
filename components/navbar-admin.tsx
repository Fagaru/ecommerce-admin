import { MainNavAdmin } from "@/components/main-nav-admin";
import UserAccount from "./user-account";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import AvatarModal from "@/components/modals/avatar-modal";

const NavbarAdmin = async () => {
    const userId = {id:"1234", name: "Dev"};

    // redirection vers le login si non connecté

    // const stores = await prismadb.store.findMany({
    //     where: {
    //         userId
    //     }
    // })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                {/* <div>
                <StoreSwitcher items={stores}/>
                </div> */}
                <MainNavAdmin className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserAccount 
                        user={userId}
                    />
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;