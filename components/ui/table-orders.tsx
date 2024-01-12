"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./button";
import { BanIcon, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "../modals/alert-modal";
import LoadingPage from "./loading";

interface DataProps {
  id: string;
  phone: string;
  address: string;
  prescription: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
};

interface OrderProps {
  data: DataProps[]
};
  
export const TableOrders: React.FC<OrderProps>= (data) => {
    const router = useRouter();
    const params = useParams();
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const [action, setAction] = useState(true);

    const onActions = async () => {
        try {
            setLoading(true);
            if (action) {
                const state = "accepted"
                await axios.patch(`/api/${params.storeId}/orders/${currentId}/state`, {state});
                router.push(`/${params.storeId}/orders/${currentId}`);
                router.refresh();
                toast.success("Order accepted. You will need to validate the order for payment to be made.");
            } else {
                const state = "denied"
                await axios.patch(`/api/${params.storeId}/orders/${currentId}/state`, {state});
                router.refresh();
                toast.success("Order closed.");
            }
            
        } catch (error) {
            toast.error("Something went wrong.");
        } finally { 
            setOpen(false);
            setLoading(false);
        }
    };

    const onValidation = (id: string) => {
        setCurrentId(id);
        setAction(true);
        setOpen(true);
        toast("You will no longer be able to edit this order after this action.")
    }

    const onDecline = (id: string) => {
        setCurrentId(id);
        setAction(false);
        setOpen(true);
        toast("Order denied.")
    }
    
    
    return loading ? (<LoadingPage />)
      : (
        <>
          <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onActions}
            loading={loading}
          />
          <div className="space-y-4 py-2 pb-4 mt-15">
          <Table className="w-auto">
            <TableCaption>A list of your pending orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Products</TableHead>
                <TableHead>Total price</TableHead>
                <TableHead></TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.products}</TableCell>
                  <TableCell className="text-right">{item.totalPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button variant="destructive" size="sm" onClick={() => onDecline(item.id)} className="ml-20 mr-5 ">
                        <BanIcon className="h-4 w-4" />
                        Decline
                      </Button>
                      <Button size="sm" onClick={() => onValidation(item.id)}>
                        <HeartHandshake className="h-4 w-4" />
                        Accepted
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </>

    )
  }
  // A partir d'ici