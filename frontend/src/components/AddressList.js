import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/addresses');
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError(error.message);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/addresses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      // Remove the deleted address from the state
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
      setError(error.message);
    }
  };

  const handleEdit = (id) => {
    // Navigate to the edit page with the address ID
    navigate(`/edit-address/${id}`);
  };

  return (
    <div>
      <h2>Address List</h2>
      {error && <p>Error: {error}</p>}
      {addresses.length > 0 ? (
        <ul>
          {addresses.map((address) => (
            <li key={address._id}>
              <div className="address-info">
                {address.name}, {address.area}, {address.state}, {address.country}, {address.pinCode}
              </div>
              <div className="button-container">
                <button onClick={() => handleEdit(address._id)}>Edit</button>
                <button onClick={() => handleDelete(address._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses saved.</p>
      )}
    </div>
  );
};

export default AddressList;