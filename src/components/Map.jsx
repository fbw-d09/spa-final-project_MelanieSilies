import React, { useState } from 'react';
import {MapContainer, TileLayer, LayerGroup, LayersControl } from 'react-leaflet';

//Import Datas
import StellplaetzeLayer from './StellpaetzeLayer';
import AusflugszieleLayer from './Ausflugsziele';
import Tagesplaetze from './Tagesplaetze';
import Trips from './Trips';

const { BaseLayer, Overlay } = LayersControl;

const MapComponent = () => {
  const [showStellplaetze, setShowStellplaetze] = useState(true);
  const [showAusflugsziele, setShowAusflugsziele] = useState(true);
  const [showTagesplaetze, setShowTagesplaetze] = useState(true);
  const [showTrips, setShowTrips] = useState(true);

  const handleLayerToggle = (layer) => {
    switch (layer) {
      case 'stellplaetze':
        setShowStellplaetze(!showStellplaetze);
        break;
      case 'ausflugsziele':
        setShowAusflugsziele(!showAusflugsziele);
        break;
      case 'tagesplaetze':
        setShowTagesplaetze(!showTagesplaetze);
        break;
      case 'trips':
        setShowTrips(!showTrips);
        break;
      default:
        break;
    }
  };
  

  return (
    <MapContainer center={[52.646559927548765, 7.088724562463824]} zoom={9} style={{ height: '100vh' }}>
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors" />
        </BaseLayer>

        <BaseLayer name="OpenTopoMap">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            maxNativeZoom={13}
          />
        </BaseLayer>
    
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </BaseLayer>

        <BaseLayer name="MtbMap">
          <TileLayer
            url="http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
          />
        </BaseLayer>

        <Overlay checked={showStellplaetze} name="Stellplätze">
          <LayerGroup>
            <StellplaetzeLayer />
          </LayerGroup>
        </Overlay>

        <Overlay checked={showAusflugsziele} name="Ausflugsziele">
          <LayerGroup>
            <AusflugszieleLayer />
          </LayerGroup>
        </Overlay>

        <Overlay checked={showTagesplaetze} name="Tagesplätze">
          <LayerGroup>
            <Tagesplaetze />
          </LayerGroup>
        </Overlay>

        <Overlay checked={showTrips} name="Trips">
          <LayerGroup>
            <Trips />
          </LayerGroup>
        </Overlay>
      </LayersControl>
      <div>
        <button onClick={() => handleLayerToggle('stellplaetze')}>
          {showStellplaetze ? 'Stellplätze ausblenden' : 'Stellplätze anzeigen'}
        </button>
        <button onClick={() => handleLayerToggle('ausflugsziele')}>
          {showAusflugsziele ? 'Ausflugsziele ausblenden' : 'Ausflugsziele anzeigen'}
        </button>
        <button onClick={() => handleLayerToggle('tagesplaetze')}>
          {showTagesplaetze ? 'Tagesplätze ausblenden' : 'Tagesplätze anzeigen'}
        </button>
        <button onClick={() => handleLayerToggle('trips')}>
          {showTrips ? 'Trips ausblenden' : 'Trips anzeigen'}
        </button>
      </div>
    </MapContainer>
  );
};

export default MapComponent;
