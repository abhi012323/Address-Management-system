import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationPermissionModal from './components/LocationPermissionModal';
import MapInterface from './components/MapInterface';
import AddressForm from './components/AddressForm';
import './App.css';

const Home = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [location, setLocation] = useState({ lat: '', lng: '', state: '', country: '' });
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = await reverseGeocode(latitude, longitude);
        setLocation({ lat: latitude, lng: longitude, ...locationData });
        setIsLocationEnabled(true);
      },
      () => {
        alert('Location access denied.');
      }
    );
  };

  const handleSearchManually = () => {
    setIsLocationEnabled(true);
  };

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const reverseGeocode = async (lat, lng) => {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const state = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || '';
    const country = addressComponents.find(component => component.types.includes("country"))?.long_name || '';
    return { state, country };
  };

  return (
    <div className="container">
      {!isLocationEnabled && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />
      )}

      <div className="flex-container">
        <div className="flex-item">
          {isLocationEnabled && <MapInterface location={location} />}
        </div>
        <div className="flex-item">
          <AddressForm onSave={handleSaveAddress} location={location} addresses={addresses} />
        </div>
      </div>
    </div>
  );
};

export default Home;