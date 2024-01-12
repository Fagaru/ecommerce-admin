import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";


interface NotificationProps {
    items: any;
    addItem: (data: any) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useNotification = create(
    persist<NotificationProps>((set, get) => ({
        items: [],
        addItem: (data: any) => {
           const currentItems = get().items;
           const existingItem = currentItems.find((item: any) => item.id === data.id);
           
           if (existingItem) {
            return toast("Notification already exist.")
           }

           set({ items: [...get().items, data] });
           toast.success("New notification received.");
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item: any) => item.id !== id)] }) 
            toast.success("Notification removed.");
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: "notification-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useNotification;