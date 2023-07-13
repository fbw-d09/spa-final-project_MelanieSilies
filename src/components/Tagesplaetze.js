import React from 'react';
import AusflugszieleData from '../data/tagesplaetze.json';
import { Marker, Popup } from 'react-leaflet';
import * as L from "leaflet";
import dayMarker from '../assets/Marker/tagesplatz.png';

import { FaWheelchair,FaHorse,FaPersonSwimming,FaFish,FaShower, FaPersonHiking, FaDog,FaLocationArrow,FaRestroom,FaChildren,FaMasksTheater} from 'react-icons/fa6';
import {IoTicketSharp, IoFitness, IoRestaurantOutline,} from 'react-icons/io5';
import { FcIdea } from "react-icons/fc";
import { TbPigMoney,TbKayak, TbBike } from "react-icons/tb";
import { GiMonkey,GiSurfBoard, GiWaterSplash ,GiWoodCanoe} from "react-icons/gi";
import { BsFillChatRightTextFill,BsCreditCard } from "react-icons/bs";
import { BiSolidTimeFive, BiSolidDrink, BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineMuseum } from "react-icons/md";

const getIcon = (key) => {
    let icon;
    let tooltipText;
  
    switch (key) {
        case 'Kultur':
            icon = <FaMasksTheater />;
            tooltipText = 'Kultur';
            break;
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
      case 'Wassersport':
          icon = <TbKayak />;
          tooltipText = 'Wassersport';
          break;
      case 'Fitness':
              icon = <IoFitness/>;
              tooltipText = 'Fitness';
              break;
      case 'Restaurant':
              icon = <IoRestaurantOutline />;
              tooltipText = 'Restaurant';
              break;
      case 'Duschen':
              icon = <FaShower />;
              tooltipText = 'Duschen';
              break;
      case 'Bademöglickeit':
              icon = <FaPersonSwimming />;
              tooltipText = 'Bademöglichkeit';
              break;
      case 'Angeln':
          icon = <FaFish />;
          tooltipText = 'Angeln';
          break;
      case 'See':
          icon = <GiWaterSplash />;
          tooltipText = 'See';
          break;
      case 'Bar':
          icon = <BiSolidDrink />;
          tooltipText = 'Bar';
          break;
      case '4RPS-Tipp':
          icon = <FcIdea />;
          tooltipText = '4RPS-Tipp';
          break;
      case 'Zoo':
        icon = <GiMonkey />;
        tooltipText = 'Zoo';
        break;
      case 'Name':
          icon = <FaLocationArrow />;
          tooltipText = 'Name';
          break;
      case 'Oeffnungszeiten':
          icon = <BiSolidTimeFive />;
          tooltipText = 'Öffnungszeiten';
          break;
      case 'Hunde':
          icon = <FaDog />;
          tooltipText = 'Hunde';
          break;
      case 'Kinder':
          icon = <FaChildren />;
          tooltipText = 'Kinder';
          break;
      case 'Reservierung':
          icon = <IoTicketSharp/>;
          tooltipText = 'Reservierung';
          break;
      case 'Barrierefrei':
          icon = <FaWheelchair />;
          tooltipText = 'Barrierefrei';
          break;
      case 'Kartenzahlung':
          icon = <BsCreditCard />;
          tooltipText = 'Kartenzahlung akzeptiert';
          break;
      case 'Toiletten':
          icon = <FaRestroom />;
          tooltipText = 'Toiletten';
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
  
  const Tagesplaetze = () => {

    const dayIcon = L.icon({
        iconUrl: dayMarker,
        iconSize: [50, 50],
      });

  return (
    <>
      {AusflugszieleData.features.map((feature, index) => {
        const { Name, Website, Aktivitäten, ...properties } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        return (
          <Marker key={index} position={[lat, lng]} icon={dayIcon} >
            <Popup maxHeight={500}>
              <div className="popup-content">
                <h2>{Name}</h2>
                <div className="beschreibung">
                  {Object.entries(properties)
                    .filter(([key, value]) => value !== 'X' && key !== 'Name')
                    .map(([key, value]) => {
                      const { icon, tooltipText } = getIcon(key);

                      return (
                        <p key={key} className={`popup-property ${key === '4RPS-Tipp' || key === 'Ueber' || key === 'Oeffnungszeiten' ? 'full-width' : ''}`}>
                          {icon && <span className="popup-icon" title={tooltipText}>{icon}</span>}
                          <span>{String(value)}</span>
                        </p>
                      );
                    })}

                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Tagesplaetze;
  