import React, { useEffect, useState } from 'react'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { geoData } from '../../data/geoData'
import Box from '@mui/material/Box'
import swal from 'sweetalert2';
import rainy from '../../assests/life-winter.gif'
import snowy from '../../assests/snow-winter.gif'
import sunny from '../../assests/sunnyday.gif'
import rainyimg from '../../assests/rainyimg.png'
import snowyimg from '../../assests/snow.png'
import sunnyimg from '../../assests/sunnyimg.png'



const center = [7.688843, 80.665844]
const MapIndex = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://web-api-development-project.onrender.com/api/metrics/data');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);

  }, []);

  // console.log('Rendered apiData:', apiData);

  async function getBackgroundGif(temperature, humidity, airPressure) {
    if (temperature > 30 && humidity > 70 && airPressure < 1000) {
      return `url(${sunny})`;

    } else if (temperature < 0) {
      return `url(${snowy})`
    }
    else if (temperature > 32) {
      return `url(${sunny})`
    }
    else if (temperature < 10 && humidity < 30 && airPressure > 1000) {
      return `url(${snowy})`;
    } else {
      return `url(${rainy})`;
    }
  }

  async function getBackgroundImage(temperature, humidity, airPressure) {
    if (temperature > 30 && humidity > 70 && airPressure < 1000) {
      return `url(${sunnyimg})`;
    } else if (temperature < 0) {
      return `url(${snowyimg})`
    }
    else if (temperature > 32) {
      return `url(${sunnyimg})`
    }
    else if (temperature < 10 && humidity < 30 && airPressure > 1000) {
      return `url(${snowyimg})`;
    } else {
      return `url(${rainyimg})`;
    }
  }

  return (
    <MapContainer
      center={center}
      zoom={7.5}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=sYX1iV7t8S9mTVHO6P94"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      ></TileLayer>
      {geoData.features.map((feature, index) => {

        const cords = feature.geometry.coordinates[0].map((item) => [item[1], item[0]]);

        return (
          <Box key={index}>
            <Polygon
              pathOptions={{
                fillColor: "#2B2D42",
                fillOpacity: 0.5,
                weight: 1,
                opacity: 9,
                dashArray: 1,
                color: "white",
              }}
              positions={cords}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillColor: "#67C6E3",
                    fillOpacity: 0.5,
                    weight: 4,
                    opacity: 9,
                    dashArray: 1,
                    color: "white",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillColor: "#2B2D42",
                    fillOpacity: 0.5,
                    weight: 1,
                    opacity: 9,
                    dashArray: 1,
                    color: "white",
                  });
                },
                click: async (e) => {
                  const { temperature, humidity, airPressure } = apiData.find(dataitem => dataitem.StatName === feature.properties.electoralDistrictCode) || {};
                  const backgroundGif = await getBackgroundGif(temperature, humidity, airPressure);
                  const bgimg = await getBackgroundImage(temperature, humidity, airPressure);
                  const opacity = 0.8;
                  const rgbaColor = `rgba(255, 255, 255, ${opacity})`;

                  await swal.fire({
                    title: feature.properties.electoralDistrict,
                    width: 600,
                    padding: "3em",
                    customClass: {
                      title: "swal-title",
                      htmlContainer: "swal-html-container",
                    },
                    html: `
                          <div class="swal-html-content">
                               <div class="weather-info">
                                 <div class="weather-info-item">
                                 <span class="info-label"><b>Temperature:</b></span>
                                 <span class="info-value"><b>${temperature || 'N/A'}</b></span>
                                 </div>
                             <div class="weather-info-item">
                               <span class="info-label"><b>Humidity:</b></span>
                               <span class="info-value"><b>${humidity || 'N/A'}</b></span>
                             </div>
                             <div class="weather-info-item">
                             <span class="info-label"><b>Air Pressure:</b></span>
                             <span class="info-value"><b>${airPressure || 'N/A'}</b></span>
                             </div>
                             </div>
                            </div>
                          `,
                    background: `${bgimg} ${rgbaColor} no-repeat center / cover`,
                    backdrop: `
                             rgba(0, 0, 123, 0.4)
                             ${backgroundGif}
                              left top
                              no-repeat
                             `,
                  });
                }
              }}
            />
          </Box>
        );
      })}
    </MapContainer>
  );
}
// alert(feature.properties.electoralDistrict)
export default MapIndex