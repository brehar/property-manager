'use strict';

var app = angular.module('propApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('tenants', {
        url: '/tenants',
        templateUrl: '/html/tenants.html',
        controller: 'tenantCtrl'
    }).state('properties', {
        url: '/properties',
        templateUrl: '/html/properties.html',
        controller: 'propCtrl'
    }).state('tenantdetails', {
        url: '/tenants/:id',
        templateUrl: '/html/tenantdetails.html',
        controller: 'tenantdetailsCtrl'
    }).state('propertydetails', {
        url: '/properties/:id',
        templateUrl: '/html/propertydetails.html',
        controller: 'propertydetailsCtrl'
    });

    $urlRouterProvider.otherwise('/');
});