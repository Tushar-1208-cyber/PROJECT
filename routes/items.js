const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CREATE: Add a new item
router.post('/add', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully!', item: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ: Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE: Update an item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Item updated successfully!', item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
