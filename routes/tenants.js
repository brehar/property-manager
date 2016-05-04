'use strict';

var express = require('express');
var router = express.Router();

var Tenant = require('../models/tenant');

router.get('/', (req, res) => {
    var sort = req.query.sort;
    delete req.query.sort;
    
    var limit = parseInt(req.query.limit);
    delete req.query.limit;
    
    var page = parseInt(req.query.page) || 0;
    delete req.query.page;
    
    Tenant.find({}).skip(page * 20).limit(limit).sort(sort).exec((err, tenants) => {
        res.status(err ? 400 : 200).send(err || tenants);
    });
});

router.get('/:id', (req, res) => {
    Tenant.findById(req.params.id, (err, tenant) => {
        res.status(err ? 400 : 200).send(err || tenant);
    });
});

router.post('/', (req, res) => {
    var tenant = new Tenant(req.body);
    
    tenant.save((err, savedTenant) => {
        res.status(err ? 400 : 200).send(err || savedTenant);
    });
});

router.delete('/:id', (req, res) => {
    Tenant.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });
});

router.put('/:id', (req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, tenant) => {
        res.status(err ? 400 : 200).send(err || tenant);
    });
});

module.exports = router;