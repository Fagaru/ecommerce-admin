"use client"

import React from "react";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { cn } from "@/lib/utils";

import { 
    LocateFixed, 
    MapPinned
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import useLocation from "@/hooks/use-location";
import GoGetMyPosition from "@/hooks/get-my-position";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface MapBoxProps extends PopoverTriggerProps {
};

export default function MapBox({className

}: MapBoxProps) {

    type newAddress = {
        placeId: string|undefined;
        label: string|undefined;
      };

    const [newAddress, setnewAddress] = useState<newAddress>({
        placeId:"",
        label:"",
    });
    const [open, setOpen] = useState(false);
    const placeholder:string = "Entrer votre adresse de livraison";
    const [updateValue] = GoGetMyPosition();

    const address = useLocation();

  
    useEffect(() => {
        if (address?.item[0]?.label === "" || address?.item[0]?.label === null || address?.item[0]?.label === undefined) {
            updateValue();
        }
      }, [address]);

    useEffect(() => {
        if (newAddress?.label!==null && newAddress?.label!=="" && newAddress?.label!==undefined) {
            address.addItem({
                label: newAddress.label,
                placeId: newAddress.placeId,
            })
        }
    }, [newAddress]);
    
    return  (
        // p-3 rounded-lg m-5 flex items-center gap-2 
        <div className="m-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select an address"
                        className={cn("w-[400px] justify-between", className)}
                    >
                        <LocateFixed className="mr-2 h-4 w-8"/>
                        {address?.item[0]?.label}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex items-center p-0 w-full">
                    <GooglePlacesAutocomplete 
                            selectProps={{
                                //newAddress, if problem, unindent
                                onChange:(place:any)=> {setnewAddress(place)},
                                placeholder: placeholder ,
                                isClearable: true,
                                className: 'p-1 border-[2px] rounded-lg w-[400px] h-full dark:dark',
                                components: {
                                    DropdownIndicator: null,
                                },
                                styles: {
                                    control: (provided: any) => ({
                                    ...provided,
                                    backgroundColor: '',
                                    border: 'none',
                                    innerWidth: '500px',
                                    width: '400px',
                                    text: '[30px]',
                                    }),
                                },
                            }}
                            
                    ></GooglePlacesAutocomplete>
                    <Button onClick={() => updateValue()} className="p-0 m-1"><MapPinned className="mr-2 h-4 w-8"/></Button>
                </PopoverContent>
            </Popover>
        </div>
    )
};