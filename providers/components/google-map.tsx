"use client"
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
} from "@react-google-maps/api";
import useLocation from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import AddressToLatLng from "@/hooks/address-to-latlng";
import EntitiesLister from "@/hooks/entities-lister";
import createMarker from "@/hooks/create-marker";

interface GoogleMapSectionProps {}


export default function GoogleMapSection(props: GoogleMapSectionProps) {
  const containerStyle = {
    width: "100%",
    height: typeof window !== "undefined" ? window.innerWidth * 0.45 : "45vw",
  };
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [map, setMap] = useState<any>(null);
  const [entity, entitesList] = EntitiesLister();
  const [geoposition, setGeoposition] = useState({lat:center.lat,lng:center.lng})
  const address = useLocation();
  const [value, addressToCoords] = AddressToLatLng(address);
  const params = useParams();

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const GiveDBPharmaciesAnAddress= async ()=>{
    const request = await axios.get(`/api/stores/${params.storeId}`);
    console.log(request)
  }

  const locatePharmacies=()=>{
    entitesList(map,center,20000,'pharmacy');
  }

  useEffect(()=>{

    addressToCoords(address);

  }, [address]);

  useEffect(()=>{
    if (value!==null && value!=="" && value!==undefined) {
      setCenter({
        lat: value[0].geometry.location.lat(),
        lng:value[0].geometry.location.lng(),
      })
      setGeoposition({
        lat: value[0].geometry.location.lat(),
        lng: value[0].geometry.location.lng(),
      });
    }
  },[value])

  useEffect(()=>{
    console.log(entity)
    if (entity !=="" && entity!==null && entity!==undefined) {
      for (let i = 0; i < entity?.length; i++) {
        createMarker(entity[i], map);
      }
      console.log("pharmacies placed")
    }
  },[entity])
  
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: "a529374fde1fcc6c" }}
      >
        {address ? (
          <MarkerF
            position={{lat:center.lat,lng: center.lng}}
            icon={{
              url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
              scaledSize: new window.google.maps.Size(25, 25)}}
          >
            <OverlayView
              position={{ lat: center.lat, lng: center.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white font-bold inline-block">
                <p className="text-black text-[16px]">{address.item.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
      ):null}
      </GoogleMap><Button onClick={locatePharmacies}>Show pharamcies</Button><Button onClick={GiveDBPharmaciesAnAddress}>DB Action</Button>
    </div>
  )
 }
