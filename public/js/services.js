'use strict';

var app = angular.module('propApp');

app.service('Properties', function($http) {
    this.getProperties = () => {
        return $http.get('/api/properties');
    };

    this.getPropertyById = id => {
        return $http.get(`/api/properties/${id}`);
    };

    this.saveProperty = property => {
        return $http.post('/api/properties', property);
    };

    this.removeProperty = id => {
        return $http.delete(`/api/properties/${id}`);
    };

    this.updateProperty = (id, newProperty) => {
        return $http.put(`/api/properties/${id}`, newProperty);
    };
    
    this.addTenant = (id, newTenant) => {
        return $http.put(`/api/properties/${id}/addTenant`, newTenant);
    };

    this.removeTenant = (propertyId, tenantId) => {
        return $http.delete(`/api/properties/${propertyId}/${tenantId}`);
    };
    
    this.getRentedProperties = () => {
        return $http.get('/api/properties/rentedProperties');
    };
});

app.service('Tenants', function($http) {
    this.getTenants = () => {
        return $http.get('/api/tenants');
    };
    
    this.getTenantById = id => {
        return $http.get(`/api/tenants/${id}`);
    };
    
    this.saveTenant = tenant => {
        return $http.post('/api/tenants', tenant);
    };
    
    this.removeTenant = id => {
        return $http.delete(`/api/tenants/${id}`);
    };
    
    this.updateTenant = (id, newTenant) => {
        return $http.put(`/api/tenants/${id}`, newTenant);
    };

    this.getAvailable = () => {
        return $http.get('/api/tenants/available');
    };
    
    this.leaveProperty = id => {
        return $http.delete(`/api/tenants/${id}/leaveProperty`);
    };
});