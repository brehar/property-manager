'use strict';

var express = require('express');
var router = express.Router();

var Property = require('../models/property');
var Tenant = require('../models/tenant');

router.get('/', (req, res) => {
    var sort = req.query.sort;
    delete req.query.sort;

    var limit = parseInt(req.query.limit);
    delete req.query.limit;

    var page = parseInt(req.query.page) || 0;
    delete req.query.page;

    Property.find({}).skip(page * 20).limit(limit).sort(sort).exec((err, properties) => {
        res.status(err ? 400 : 200).send(err || properties);
    });
});

router.get('/:id', (req, res) => {
    Property.findById(req.params.id).populate('tenants').exec((err, property) => {
        res.status(err ? 400 : 200).send(err || property);
    });
});

router.post('/', (req, res) => {
    var property = new Property(req.body);

    property.save((err, savedProperty) => {
        res.status(err ? 400 : 200).send(err || savedProperty);
    });
});

router.delete('/:id', (req, res) => {
    Property.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });
});

router.put('/:id', (req, res) => {
    Property.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, property) => {
        res.status(err ? 400 : 200).send(err || property);
    });
});

router.put('/:property/addTenant', (req, res) => {
    Property.findById(req.params.property, (err, property) => {
        if (err) return res.status(400).send(err);

        var newTenant = req.body.tenant;
        property.tenants.push(newTenant);

        property.save((err, savedProperty) => {
            if (err) return res.status(400).send(err);

            Tenant.findById(newTenant, (err, tenant) => {
                if (err) return res.status(400).send(err);

                tenant.property = req.params.property;

                tenant.save((err, savedTenant) => {
                    if (err) return res.status(400).send(err);

                    Property.findById(req.params.property).populate('tenants').exec((err, newProperty) => {
                        res.status(err ? 400 : 200).send(err || newProperty);
                    });
                })
            });
        });
    });
});

router.delete('/:property/:tenant', (req, res) => {
    Property.findById(req.params.property, (err, property) => {
        if (err) return res.status(400).send(err);

        var index = property.tenants.indexOf(req.params.tenant);
        property.tenants.splice(index, 1);

        property.save((err, savedProperty) => {
            Tenant.findByIdAndUpdate(req.params.tenant, {$unset: {property: 1}}, (err, tenant) => {
                res.status(err ? 400 : 200).send(err || tenant);
            });
        });
    });
});

module.exports = router;