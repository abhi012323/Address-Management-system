const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// Create a new address
router.post('/addresses', async (req, res) => {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).send(address);
    } catch (error) {
        console.error('Error creating address:', error);
        res.status(400).send({ message: 'Failed to save address', error });
    }
});

// Get all addresses
router.get('/addresses', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).send(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).send({ message: 'Failed to fetch addresses', error });
    }
});

// Get a single address by ID
router.get('/addresses/:id', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).send({ message: 'Address not found' });
        }
        res.status(200).send(address);
    } catch (error) {
        console.error('Error fetching address by ID:', error);
        res.status(500).send({ message: 'Failed to fetch address', error });
    }
});

// Update an address by ID
router.put('/addresses/:id', async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!address) {
            return res.status(404).send({ message: 'Address not found' });
        }
        res.status(200).send(address);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(400).send({ message: 'Failed to update address', error });
    }
});

// Delete an address by ID
router.delete('/addresses/:id', async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).send({ message: 'Address not found' });
        }
        res.status(200).send({ message: 'Address deleted' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).send({ message: 'Failed to delete address', error });
    }
});

module.exports = router;