
const CalculateDistance =(address1:any, address2:any)=>{
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
        {lat:address1.lat,lng:address1.lng},
        {lat:address2.lat,lng:address2.lng}
    )
    return dist*0.001
}

export default CalculateDistance;