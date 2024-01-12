"use client";

// import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderClient } from "@/providers/components/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvatarModal from "@/components/modals/avatar-modal";
import { Button } from "@/components/ui/button";
import { io } from 'socket.io-client';

type foramttedData = {
  id: string,
  phone: string,
  address: string,
  isPaid: boolean,
  totalPrice: string,
  prescription: string,
  products: string,
  state: string,
  status: string,
  createdAt: string
}

interface DraggableInboxProps {
  formattedOrdersState: foramttedData[],
  formattedOrdersInPreparation: foramttedData[],
  formattedOrdersReady: foramttedData[]
};

const DraggableInbox: React.FC<DraggableInboxProps> = ({
  formattedOrdersState,
  formattedOrdersInPreparation,
  formattedOrdersReady
}) => {

  const [stateLength, setStateLength] = useState("0");
  const [inPreparationLength, setInPreparationLength] = useState("0");
  const [readyLength, setReadyLength] = useState("0");
  const socket: any = useRef();
  
  // const socket: any = useRef();

  useEffect(() => {
      // setSocket(io("ws://localhost:5000"));
      socket.current = io("ws://localhost:5000");
  }, []);


  useEffect(() => {
    if (formattedOrdersState.length > 99) {
      setStateLength('+99');
    } else {
      setStateLength(formattedOrdersState.length.toString());
    }

    if (formattedOrdersInPreparation.length > 99) {
      setInPreparationLength('+99');
    } else {
      setInPreparationLength(formattedOrdersInPreparation.length.toString());
    }

    if (formattedOrdersReady.length > 99) {
      setReadyLength('+99');
    } else {
      setReadyLength(formattedOrdersReady.length.toString());
    }
    
  }, [formattedOrdersState, formattedOrdersInPreparation, formattedOrdersReady]);

  return (
    <div>
      <Draggable>
        <div className='relative'>
        {(formattedOrdersState.length > 0) &&
            <span className="absolute flex h-[20px] w-[20px] bg-red-500 text-white text-sm top-[-10px] left-[-10px] z-50 items-center justify-center rounded-full">{stateLength}</span>}
        <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <AvatarModal 
                            params={{name: "Abdoulaye"}}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                        <div className="">
                                {/* <TableOrders data={formattedOrders}/> */}
                            {/* <OrderClient data={formattedOrders}/> */}
                            <Tabs defaultValue="state" className="max-w-[800px]">
                                <TabsList>
                                    <TabsTrigger value="state" className="relative">
                                      {formattedOrdersState.length > 0 &&
                                        <span className="absolute flex h-[20px] w-[20px] bg-red-500 text-white text-sm top-[-10px] left-[-15px] z-50 items-center justify-center rounded-full">{stateLength}</span>}
                                        State in pending
                                    </TabsTrigger>
                                    <TabsTrigger value="course-in-preparation" className="relative">
                                      {formattedOrdersInPreparation.length > 0 &&
                                        <span className="absolute flex h-[20px] w-[20px] bg-yellow-500 text-white text-sm top-[-10px] left-[-10px] z-50 items-center justify-center rounded-full">{inPreparationLength}</span>}
                                      Orders in preparation
                                    </TabsTrigger>
                                    <TabsTrigger value="course-ready" className="relative">
                                    {formattedOrdersReady.length > 0 &&
                                      <span className="absolute flex h-[20px] w-[20px] bg-sky-500 text-white text-sm top-[-10px] left-[-10px] z-50 items-center justify-center rounded-full">{readyLength}</span>}
                                      Orders ready  
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="state">
                                    <OrderClient data={formattedOrdersState}/>
                                </TabsContent>
                                <TabsContent value="course-in-preparation">
                                    <OrderClient data={formattedOrdersInPreparation}/>
                                </TabsContent>
                                <TabsContent value="course-ready">
                                    <OrderClient data={formattedOrdersReady}/>
                                </TabsContent>
                            </Tabs>
                        </div>
                </PopoverContent>
            </Popover>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableInbox;
