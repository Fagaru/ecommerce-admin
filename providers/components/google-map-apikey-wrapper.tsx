"use client"

import { LoadScript } from "@react-google-maps/api";
import GoogleMapSection from "./google-map";

interface GoogleMapSecionApiKeyWrapperProps {}

export default function GoogleMapSecionApiKeyWrapper(props:GoogleMapSecionApiKeyWrapperProps) {
    return (
        <LoadScript 
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
            libraries={['places', 'geometry','geocoding']}>
            <GoogleMapSection />
        </LoadScript>
    );
};




