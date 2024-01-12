"use client"

import { LoadScript } from "@react-google-maps/api";
import MapBox from "./map-box";

interface MapBoxApiKeyWrapperProps {}

export default function MapBoxApiKeyWrapper(props:MapBoxApiKeyWrapperProps) {
    return (
        <LoadScript 
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
            libraries={['places', 'geometry','geocoding']}>
            <MapBox />
        </LoadScript>
    );
};




