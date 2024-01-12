import { useState } from "react";
import { useEffect } from "react";

function createMarker(place: any, map:any) {
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
    })

    const contentString = `<div>
                                <h2>${place.name}</h2>
                                <p>${place.vicinity}</p>
                            </div>`;

    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
};

export default createMarker;