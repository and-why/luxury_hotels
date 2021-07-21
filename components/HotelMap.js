import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon } from '@chakra-ui/react';
import { ImLocation } from 'react-icons/im';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function HotelMap({ latitude, longitude, name }) {
  const apikey = (mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY);

  const [viewport, setViewport] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 10,
  });

  return (
    <ReactMapGL
      {...viewport}
      width='100%'
      height='500px'
      onViewportChange={setViewport}
      mapboxApiAccessToken={apikey}
    >
      <Marker latitude={latitude} longitude={longitude} offsetTop={-20} offsetLeft={-20}>
        <Icon as={ImLocation} color='brand.100' h='40px' w='40px' />
      </Marker>
    </ReactMapGL>
  );
}
