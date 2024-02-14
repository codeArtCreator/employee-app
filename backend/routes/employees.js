const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create (POST)
router.post('/', async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read (GET)
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read one (GET)
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update (PUT)
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search (GET)
router.get('/search', async (req, res) => {
    try {
        const { name, address } = req.query;
        const query = {};
        if (name) query.name = new RegExp(name, 'i');
        if (address) query.address = new RegExp(address, 'i');
        const employees = await Employee.find(query);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
