const express = require('express');
const Form = require('./form');  // Adjust the path as necessary
const router = express.Router();

// POST create form
router.post('/form', async (req, res) => {
  try {
    const { label, inputs } = req.body;
    const newForm = new Form({ label, inputs });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error('Error creating form:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Error creating form', error });
  }
});

// GET all forms
router.get('/forms', async (_req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Error fetching forms', error });
  }
});

// GET form by ID
router.get('/form/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Error fetching form', error });
  }
});

// PUT update form by ID
router.put('/form/:id', async (req, res) => {
  try {
    const { label, inputs } = req.body;
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { label, inputs },
      { new: true }
    );
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Error updating form', error });
  }
});

// DELETE form by ID
router.delete('/form/:id', async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'Error deleting form', error });
  }
});

module.exports = router;
