import React from 'react';

const LocationPermissionModal = ({ onEnableLocation, onSearchManually }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Location Permission</h2>
        <button className="button" onClick={onEnableLocation}>Enable Location</button>
        <button className="button" onClick={onSearchManually}>Search Manually</button>
      </div>
    </div>
  );
};

export default LocationPermissionModal;