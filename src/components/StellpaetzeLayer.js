import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import stellplaetzeData from '../data/stellplaetze.json';
import * as L from "leaflet";
import blueMarker from  '../assets/Marker/stellplatz.png'



import { MdOutlineMuseum } from "react-icons/md";
import { FaFish, FaPersonSwimming,FaDog,FaLocationArrow,FaWifi,FaRestroom,FaToilet,FaShower,FaChildren,FaRegSnowflake,FaHorse,FaPersonHiking } from 'react-icons/fa6';
import {IoFitness, IoWaterSharp, IoRestaurantOutline,} from 'react-icons/io5';
import {FaShoppingBasket} from 'react-icons/fa';
import { FcIdea } from "react-icons/fc";
import { TbWorldWww, TbParking,TbPigMoney,TbKayak,TbBike } from "react-icons/tb";
import { PiPlugChargingFill } from "react-icons/pi";
import { GiWaterRecycling,GiSlicedBread,GiGasStove,GiWoodCanoe,GiSurfBoard } from "react-icons/gi";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { BiSolidShoppingBags } from "react-icons/bi";


const getIcon = (keyOrActivity) => {
    let icon;
    let tooltipText;
  
    switch (keyOrActivity) {
        case 'Museum':
            icon = <MdOutlineMuseum />;
            tooltipText = 'Museum';
            break;
        case 'Reiten':
            icon = <FaHorse />;
            tooltipText = 'Reiten';
            break;
        case 'SUP':
            icon = <GiSurfBoard />;
            tooltipText = 'SUP';
            break;
        case 'Kanu':
            icon = <GiWoodCanoe />;
            tooltipText = 'Kanu';
            break;
        case 'Wandern':
            icon = <FaPersonHiking />;
            tooltipText = 'Wandern';
            break;
        case 'Shopping':
            icon = <BiSolidShoppingBags />;
            tooltipText = 'Shopping';
            break;
        case 'Radfahren':
            icon = <TbBike />;
            tooltipText = 'Radfahren';
            break;
        case 'Kayak':
            icon = <TbKayak />;
            tooltipText = 'Kayak';
            break;

        case 'Bademöglichkeit':
            icon = <FaPersonSwimming />;
            tooltipText = 'Bademöglichkeit';
            break;
        case 'Angeln':
            icon = <FaFish />;
            tooltipText = 'Angeln';
            break;
        case 'Hunde':
            icon = <FaDog />;
            tooltipText = 'Hunde willkommen';
            break;
        case '4RPS-Tipp':
            icon = <FcIdea />;
            tooltipText = '4RPS-Tipp';
            break;
        case 'Website':
            icon = <TbWorldWww />;
            tooltipText = 'Website';
            break;
        case 'Name':
            icon = <FaLocationArrow />;
            tooltipText = 'Name';
            break;
        case 'Strom':
            icon = <PiPlugChargingFill />;
            tooltipText = 'Strom';
            break;
        case 'Wasser':
            icon = <IoWaterSharp />;
            tooltipText = 'Wasser';
            break;
        case 'Einkaufsmöglichkeiten':
            icon = <FaShoppingBasket />;
            tooltipText = 'Einkaufsmöglichkeiten';
            break;
        case 'Fitness':
            icon = <IoFitness/>;
            tooltipText = 'Fitness';
            break;
        case 'Restaurant':
            icon = <IoRestaurantOutline />;
            tooltipText = 'Restaurant';
            break;
        case 'Anzahl der Plätze':
            icon = <TbParking />;
            tooltipText = 'Anzahl der Plätze';
            break;
        case 'Wlan':
            icon = <FaWifi />;
            tooltipText = 'Wlan';
            break;
        case 'Toilettenentsorgung':
            icon = <FaToilet />;
            tooltipText = 'Toilettenentsorgung';
            break;
        case 'Abwasserentsorgung':
            icon = <GiWaterRecycling />;
            tooltipText = 'Abwasserentsorgung';
            break;
        case 'Toiletten':
            icon = <FaRestroom />;
            tooltipText = 'Toiletten';
            break;
        case 'Duschen':
            icon = <FaShower />;
            tooltipText = 'Duschen';
            break;
        case 'Kinder':
            icon = <FaChildren />;
            tooltipText = 'Kinder willkommen';
            break;
        case 'Wintercamping':
            icon = <FaRegSnowflake />;
            tooltipText = 'Wintercamping';
            break;
        case 'Bäcker':
            icon = <GiSlicedBread />;
            tooltipText = 'Bäcker';
            break;
        case 'Gasflaschenservice':
            icon = <GiGasStove />;
            tooltipText = 'Gasflaschenservice';
            break;
        case 'Preis':
            icon = <TbPigMoney />;
            tooltipText = 'Preis';
            break;
        case 'Ueber':
            icon = <BsFillChatRightTextFill/>;
            tooltipText = "Beschreibung";
            break;
                
      
      default:
        icon = null;
        break;
    }
  
    return { icon, tooltipText };
  };

const StellplaetzeLayer = () => {

    const blueIcon = L.icon({
        iconUrl: blueMarker,
        iconSize: [50, 50],
      });

  return (
    <>
      {stellplaetzeData.features.map((feature, index) => {
        const { Name, Website, Aktivitäten, ...properties } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        return (
            <Marker key={index} position={[lat, lng]} icon={blueIcon}>
            <Popup maxHeight={500}>
              <div className='popup-content'>
                <h2>{Name}</h2>
                {Website && (
                <b>
                    <span className="popup-icon" title="Website">
                    <TbWorldWww />
                    </span>{" "}
                    <a href={Website}>{Website}</a>
                </b>
                )}  
                <div className="beschreibung">           
                {Object.entries(properties)
                    .filter(([key, value]) => value !== 'X')
                    .map(([key, value]) => {
                        const { icon, tooltipText } = getIcon(key);

                    return (
                    <p key={key} className={`popup-property ${key === '4RPS-Tipp' || key === 'Ueber' ? 'full-width' : ''}`}>
                        {icon && <span className="popup-icon" title={tooltipText}>{icon}</span>}
                        <span>{String(value)}</span>
                    </p>
                    );
                })}

                    </div>  
                    <div className='activities'>
                        <b>Aktivitäten:</b>
                            <div className="activityIcons">
                            {Aktivitäten.map((aktivität, index) => {
                                const { icon, tooltipText } = getIcon(aktivität);
                                return (
                                    <li key={index}>
                                    <span alt={aktivität} title={tooltipText}>{icon}</span>
                                    </li>
                                );
                            })}
                            </div>
                    </div>
                </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default StellplaetzeLayer;
