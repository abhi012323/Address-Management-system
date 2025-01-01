const mongoose = require('mongoose');

// Define the Address schema
const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: String, required: true },
  houseNumber: { type: String, required: false }, // Optional
});

// Create and export the Address model
module.exports = mongoose.model('Address', AddressSchema);
