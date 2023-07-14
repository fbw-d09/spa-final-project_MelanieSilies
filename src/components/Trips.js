import React from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import supGiethoorn from "../data/sup-giethoorn.json";
import eBikeGeestmoor from "../data/e-bike-tour_geestmoor.json";


function Trips() {
    
   
  
    const setRoute = ({ geometry, properties }, layer) => {
        const latlngs = geometry.coordinates.map((coords) => [coords[1], coords[0]]);
        const polyline = L.polyline(latlngs);
    
        const popupContent = `
          <div>
            <h3>${properties.name}</h3>
            <p>Type: ${properties.type}</p>
            <p>Ausrüstung: ${properties.ausruestung}</p>
            <p>Beschreibung: ${properties.beschreibung}</p>
            <a href="${properties.website}" target="_blank">zur Route</a>
          </div>
        `;
    
        layer.bindPopup(popupContent);
    
        return polyline;
      };
    
    

  return (
        <>
        
        <GeoJSON  
        data={supGiethoorn} 
        style={{ color: 'red' }} 
        onEachFeature={setRoute} />

        <GeoJSON 
        data={eBikeGeestmoor} 
        style={{ color: 'red' }} 
        onEachFeature={setRoute} />
        
        </>
      );
}

export default Trips;