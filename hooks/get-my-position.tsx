import { useState, useEffect } from 'react';

import useLocation from "@/hooks/use-location";


const GoGetMyPosition = () => {
    const [value, setValue] = useState<any>(null);
    const address = useLocation();

    useEffect(() => {
        if (value) {
            address.addItem({
                label: value?.formatted_address,
                placeId: value?.placeId,
            })
        }
      }, [value]);

    const updateValue = (): void => {
        if ('geolocation' in navigator) {
        
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                const latlng = {
                    lat: latitude,
                    lng: longitude,
                };
                  
                const geocoder:any = new google.maps.Geocoder();
                geocoder.geocode({ location: latlng }).then((response:any) => {
                    if (response) {
                        setValue(response.results[0])
                    } 
                })
            });
        }
    };

    return [updateValue]
  };


export default GoGetMyPosition;