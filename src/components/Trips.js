import React from 'react';
import * as L from "leaflet";
import MapComponent from './Map';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import SUPGiethoorn from '../assets/gpx/sup-giethoorn.gpx';

const GpxMap = () => {

    
    var map = L.map('map');
    L.titleLayer('http://{s}.title.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
    }).addTo(map);
    

    var gpx = '../assets/gpx/sup-giethoorn.gpx';
    new L.GPX(gpx, {async:true}).on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);
    
}

export default GpxMap;