import React from 'react';

const LocationPopup = ({ onEnableLocation, onSearchManually }) => {
    return (
        <div className="popup">
            <h2>Location Permission</h2>
            <button onClick={onEnableLocation} className="button">Enable Location</button>
            <button onClick={onSearchManually} className="button">Search Manually</button>
        </div>
    );
};

export default LocationPopup;