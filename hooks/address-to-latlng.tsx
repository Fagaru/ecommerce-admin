import { useEffect } from "react";
import { useState } from "react";

const AddressToLatLng = (address:any) => {
    const [value, setValue]  = useState<any>();
    const myaddress = address?.item[0]?.label;
    const geocoder = new google.maps.Geocoder();

    useEffect(() => {
        console.log('Value:', value);
        }, [value]);

    const updateValue = (): void => {
        geocoder.geocode({'address':myaddress}, (results,status)=>{
            if (results && status === 'OK') {
              setValue(results)
              console.log(results, status)
            } 
            else {console.log("no response")}
            })
    }
 
    return [value, updateValue]
  };

export default AddressToLatLng