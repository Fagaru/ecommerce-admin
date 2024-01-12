import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";



interface UseLocationProps {
    item: any;
    addItem: (data: any) => void;
    removeAll: () => void;
}

const useLocation = create(
    persist<UseLocationProps>((set, get) => ({
        item: [],
        addItem: (data: any) => {
           const currentItems = get().item;
           set({ item: [] })
           set({ item: [...get().item, data] });
           toast.success("Address updated.");
        },

        removeAll: () => set({ item: [] }),
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useLocation;