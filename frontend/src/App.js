import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LocationPermissionModal from './components/LocationPermissionModal';
import MapInterface from './components/MapInterface';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import EditAddress from './components/EditAddress'; // Import the EditAddress component
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const Home = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
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

  return (
    <div className="container">
      {!isLocationEnabled && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />
      )}

      <div className="flex-container">
        <div className="flex-item" style={{ flex: '0 0 300px' }}>
          {isLocationEnabled && <MapInterface location={location} />}
        </div>
        <div className="flex-item" style={{ flex: '1' }}>
          <AddressForm onSave={handleSaveAddress} location={location} />
        </div>
      </div>

      <div className="button-container">
        <button onClick={() => navigate('/addresses')}>View Address List</button>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addresses" element={<AddressList />} />
      <Route path="/edit-address/:id" element={<EditAddress />} /> {/* Add route for EditAddress */}
    </Routes>
    <Footer />
  </Router>
);

export default App;