import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    area: '',
    state: '',
    country: '',
    pinCode: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/addresses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }
        const data = await response.json();
        setAddress(data);
      } catch (error) {
        console.error('Error fetching address:', error);
        setError(error.message);
      }
    };

    fetchAddress();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      navigate('/addresses');
    } catch (error) {
      console.error('Error updating address:', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h2>Edit Address</h2>
      {error && <p>Error: {error}</p>}
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={address.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Apartment/Road/Area:</label>
        <input
          type="text"
          name="area"
          value={address.area}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Pin Code:</label>
        <input
          type="text"
          name="pinCode"
          value={address.pinCode}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Address</button>
      <button type="button" onClick={() => navigate('/addresses')}>Cancel</button>
    </form>
  );
};

export default EditAddress;