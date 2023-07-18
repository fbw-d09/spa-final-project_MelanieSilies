import React, { useEffect, useState } from 'react';
import tagespaetzeData from '../data/tagesplaetze.json';
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

      const [weatherData, setWeatherData] = useState([]);

      useEffect(() => {
          const fetchData = async () => {
            try {
              const promises = tagespaetzeData.features.map((feature) => {
                const [lng, lat] = feature.geometry.coordinates;
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,rain,showers,snowfall,cloudcover,windspeed_10m,uv_index&daily=temperature_2m_max,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max&timezone=Europe%2FBerlin&current_weather=true`)
                  .then((response) => response.json())
                  .catch((error) => {
                    console.error('Error fetching weather data:', error);
                    return null;
                  });
              });
              const data = await Promise.all(promises);
              setWeatherData(data);
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
          };
      
          fetchData();
        }, []);

  return (
    <>
      {tagespaetzeData.features.map((feature, index) => {
        const { Name, Website, Aktivitäten, ...properties } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        const weather = weatherData[index];

        const weatherCodeText = (code) => {
            let weatherText
            switch (code) {
                case 0:
                    weatherText = 'Klar';
                    break;
                case 1:
                    weatherText = 'Überwiegend klar';
                    break;
                case 2:
                    weatherText = 'teils bewölkt';
                    break;
                case 3:
                    weatherText = 'bewölkt';
                    break;
                case 45:
                    weatherText = 'Nebel';
                    break;
                case 48:
                    weatherText = 'ablagernder Raureifnebel';
                    break;

                case 51:
                    weatherText = 'leichter Nieselregen';
                    break;
                case 53:
                    weatherText = 'Nieselregen';
                    break;
                case 55:
                    weatherText = 'dichter Nieselregen';
                    break;

                case 56:
                    weatherText = 'Gefrierender Nieselregen';
                    break;
                case 57:
                    weatherText = 'starker gefrierender Nieselregen';
                    break;

                case 61:
                    weatherText = 'leichter Regen';
                    break;
                case 63:
                    weatherText = 'Regen';
                    break;
                case 65:
                    weatherText = 'starker Regen';
                    break;

                case 71:
                    weatherText = 'leichter Schneefall';
                    break;
                case 73:
                    weatherText = 'Schneefall';
                    break;
                case 75:
                    weatherText = 'starker Schneefall';
                    break;

                case 77:
                    weatherText = 'Grieselschnee';
                    break;

                case 80:
                    weatherText = 'leichte Regenschauer';
                    break;
                case 81:
                    weatherText = 'Regenschauer';
                    break;
                case 82:
                    weatherText = 'starke Regenschauer';
                    break;

                case 85:
                    weatherText = 'leichte Schneeschauer';
                    break;
                case 86:
                    weatherText = 'starke Schneeschauer';
                    break;

                case 95:
                    weatherText = 'Gewitter';
                    break;
                case 96:
                    weatherText = 'Gewitter mit leichtem Hagel';
                    break;
                case 99:
                    weatherText = 'Gewitter mit schwerem Hagel';
                    break;

                default:
                    weatherText = 'Das stimmt was nicht';
                    break;
                }
                
                return weatherText;
                };

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
                {weather && (
                  <div className='weather'>
                      <b>Wetter: {weatherCodeText(weather.current_weather.weathercode)}</b>
                      <p>Temperatur: {weather.current_weather.temperature}°C</p>
                      <p>Windgeschwindigkeit: {weather.current_weather.windspeed} km/h</p>
                      <p>Windrichtung: {weather.current_weather.winddirection}</p> 
                  </div>
                    )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Tagesplaetze;
  