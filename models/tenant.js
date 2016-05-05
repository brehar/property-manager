'use strict';

var mongoose = require('mongoose');

var tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }
});

var Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;