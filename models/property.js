'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    occupied: {
        type: String,
        required: true,
        enum: ['Vacant', 'Occupied']
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    rent: {
        type: Number,
        required: true
    },
    utilities: {
        type: Number,
        required: true
    },
    tenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant'
        }
    ]
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;