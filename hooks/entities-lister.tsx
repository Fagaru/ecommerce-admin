import { useEffect } from "react";
import { useState } from "react";

const EntitiesLister =()=>{
    const [entity, setEntity] = useState<any>();

    const entitesList=(map:any,center:any,radius:number,type:string):void=>{
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
            {
                location: center,
                radius: radius, 
                type: type,
            },
            (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                console.log("pharmacies around", results)
                setEntity(results)
                }
            }
        )
    }
    

    return [entity, entitesList]
  }

  export default EntitiesLister