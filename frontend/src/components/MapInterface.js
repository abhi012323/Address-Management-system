// import React, { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';

// // Set the Mapbox access token
// mapboxgl.accessToken = 'pk.eyJ1IjoiYWJoaTAxMjMyMyIsImEiOiJjbTVhdXNoMG8xeGo3MndzZ2J5aDl0NG0wIn0.kjmxnFvM0ZeZ5c_P4D39pA';

// const MapInterface = ({ onLocationSelect }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   // Initial location state
//   const [location, setLocation] = useState({ lng: 150.644, lat: -34.397, zoom: 9 });

//   // Initialize the map once on component mount
//   useEffect(() => {
//     if (map.current) return; // Initialize map only once

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [location.lng, location.lat],
//       zoom: location.zoom,
//     });

//     // Add click event to map
//     map.current.on('click', (e) => {
//       const newLocation = { lng: e.lngLat.lng, lat: e.lngLat.lat };
//       setLocation((prevState) => ({ ...prevState, ...newLocation }));
//       onLocationSelect(newLocation);

//       // Add a marker to the clicked location
//       new mapboxgl.Marker().setLngLat([newLocation.lng, newLocation.lat]).addTo(map.current);
//     });

//     // Use browser's geolocation API to set the map's initial center
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const userLocation = { lng: position.coords.longitude, lat: position.coords.latitude };
//         setLocation((prevState) => ({ ...prevState, ...userLocation, zoom: 12 }));
//         map.current.setCenter([userLocation.lng, userLocation.lat]);
//       });
//     }
//   }, [location.lat, location.lng, location.zoom, onLocationSelect]); // Add dependencies

//   // Update the map center when the location state changes
//   useEffect(() => {
//     if (!map.current) return; // Wait for map to initialize
//     map.current.setCenter([location.lng, location.lat]);
//   }, [location.lng, location.lat]);

//   return <div ref={mapContainer} className="map-container" style={{ touchAction: 'none' }} />;
// };

// export default MapInterface;

// // import React from 'react';

// // const MapInterface = ({ location }) => {
// //   return (
// //     <div className="map-container">
// //       <h2>Map Interface</h2>
// //       <p>State: {location.state}</p>
// //       <p>Country: {location.country}</p>
// //       {/* Add your map implementation here */}
// //     </div>
// //   );
// // };

// // export default MapInterface;
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapInterface = ({ location }) => {
  const center = {
    lat: parseFloat(location.lat) || 37.7749, // Default to San Francisco if no location is provided
    lng: parseFloat(location.lng) || -122.4194, // Default to San Francisco if no location is provided
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAAFh--imAQAsIYruYIxGICLnV35ptsUdQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Child components, such as markers, info windows, etc., can be added here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapInterface;

// AIzaSyAAFh--imAQAsIYruYIxGICLnV35ptsUdQ