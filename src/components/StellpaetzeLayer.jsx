import React, { useEffect, useState } from 'react';
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
import { BsFillChatRightTextFill, BsCalendarWeekFill } from "react-icons/bs";
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
        case 'Reservierung':
            icon = <BsCalendarWeekFill/>;
            tooltipText = "Reservierung";
            break;
                
      
      default:
        icon = null;
        break;
    }
  
    return { icon, tooltipText };
  };

const StellplaetzeLayer = () => {

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const promises = stellplaetzeData.features.map((feature) => {
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

  const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [50, 50],
  });


  return (
    <>
      {stellplaetzeData.features.map((feature, index) => {
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

export default StellplaetzeLayer;
