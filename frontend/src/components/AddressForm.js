import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressForm = ({ onSave, location }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [buttonText, setButtonText] = useState('Save Address');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.country) {
      setState(location.state);
      setCountry(location.country);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = { name, area, state, country, pinCode };
    try {
      const response = await fetch('http://localhost:3000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        onSave(newAddress);
        setName('');
        setArea('');
        setState('');
        setCountry('');
        setPinCode('');
        setButtonText('Address Saved');
        setTimeout(() => setButtonText('Save Address'), 2000); // Reset the button text after 2 seconds
        setError(null); // Clear any previous error
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setError('An error occurred while saving the address');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Apartment/Road/Area:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Pin Code:</label>
        <input
          type="text"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          required
        />
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="form-button-container">
        <button type="submit">{buttonText}</button>
        <button type="button" onClick={() => navigate('/addresses')}>
          View Address List
        </button>
      </div>
    </form>
  );
};

export default AddressForm;