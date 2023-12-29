const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {
    Contact.find()
    .populate('group')
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(err=>{
        return res.status(500).json({
            title: "An error occurred",
            error: err.message
        })
    })
})

router.post('', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId('contacts');
    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    })

    contact.save()
    .then(createdContact => {
        res.status(201).json({
            message: 'Contact added successfully',
            contact: createdContact
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'An error occurred',
            error: err
          });
    })
})

router.put("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
    .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

        Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
            })
        })
        .catch(err=> {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Contact not found.',
            error: { contact: 'Contact not found'}
          });
    })
})

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
    .then((contact)=>{
        Contact.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(204).json({
                message: "Contact deleted successfully"
              });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
         })
    })
    .catch(error => {
        res.status(500).json({
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
})