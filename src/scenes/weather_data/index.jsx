import React from 'react'
import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { geoData } from '../../data/geoData'
import Box from '@mui/material/Box'
import swal from 'sweetalert';

const center = [7.688843, 80.665844]
const MapIndex = () => {

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
        //const cords2=feature.properties.coordinates.length;
        // console.log(feature.geometry.coordinates.length + " - " + index)
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
                click: (e) => {
                  swal({
                    title: feature.properties.electoralDistrict,
                    text: localStorage.getItem('token'),
                    html: true
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