// routes/formRoutes.js
const express = require('express');
const Form = require('./form');

const router = express.Router();


router.post('/form', async (req, res) => {
  try {
    const { label, inputs } = req.body;
    const newForm = new Form({ label, inputs });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error });
  }
});


router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error });
  }
});


router.get('/form/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error });
  }
});


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
    res.status(500).json({ message: 'Error updating form', error });
  }
});

router.delete('/form/:id', async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form', error });
  }
});

module.exports = router;
