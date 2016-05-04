'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    occupied: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    utilities: {
        type: Number,
        required: true
    }
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;