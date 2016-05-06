'use strict';

var app = angular.module('propApp');

app.controller('homeCtrl', function() {
    
});

app.controller('tenantCtrl', function($scope, Tenants) {
    Tenants.getTenants().then(res => {
        $scope.tenants = res.data;
    });
    
    $scope.addTenant = function() {
        $scope.tenantToAdd = true;
    };

    $scope.cancelAdd = function() {
        $scope.tenantToAdd = false;
    };
    
    $scope.saveTenant = function() {
        Tenants.saveTenant($scope.newTenant).then(res => {
            $scope.tenants.push(res.data);
            $scope.tenantToAdd = false;
            $scope.newTenant = {};
        });
    };
    
    $scope.removeTenant = function(id, tenant) {
        var index = $scope.tenants.indexOf(tenant);

        Tenants.removeTenant(id).then(res => {
            $scope.tenants.splice(index, 1);
        });
    };

    var editingIndex;

    $scope.editTenant = function(id, tenant) {
        editingIndex = $scope.tenants.indexOf(tenant);
        $scope.tenantToEdit = angular.copy(tenant);
    };

    $scope.saveEdit = function() {
        Tenants.updateTenant($scope.tenantToEdit._id, $scope.tenantToEdit).then(res => {
            $scope.tenants[editingIndex] = $scope.tenantToEdit;
            $scope.tenantToEdit = null;
        });
    };

    $scope.cancelEdit = function() {
        $scope.tenantToEdit = null;
    };

    $scope.sort = {
        active: '',
        descending: undefined
    };

    $scope.changeSorting = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            sort.descending = !sort.descending;
        } else {
            sort.active = column;
            sort.descending = false;
        }
    };

    $scope.getIcon = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            return sort.descending ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
        }

        return 'glyphicon-star';
    };
});

app.controller('tenantdetailsCtrl', function($scope, $state, Tenants) {
    Tenants.getTenantById($state.params.id).then(res => {
        $scope.tenant = res.data;
    });
});

app.controller('propCtrl', function($scope, Properties) {
    $scope.bedrooms = [1, 2, 3];

    Properties.getProperties().then(res => {
        $scope.properties = res.data;
    });

    $scope.addProperty = function() {
        $scope.propertyToAdd = true;
    };

    $scope.cancelAdd = function() {
        $scope.propertyToAdd = false;
    };

    $scope.saveProperty = function() {
        Properties.saveProperty($scope.newProperty).then(res => {
            $scope.properties.push(res.data);
            $scope.propertyToAdd = false;
            $scope.newProperty = {};
        });
    };

    $scope.removeProperty = function(id, property) {
        var index = $scope.properties.indexOf(property);

        Properties.removeProperty(id).then(res => {
            $scope.properties.splice(index, 1);
        });
    };

    var editingIndex;

    $scope.editProperty = function(id, property) {
        editingIndex = $scope.properties.indexOf(property);
        $scope.propertyToEdit = angular.copy(property);
    };

    $scope.saveEdit = function() {
        Properties.updateProperty($scope.propertyToEdit._id, $scope.propertyToEdit).then(res => {
            $scope.properties[editingIndex] = $scope.propertyToEdit;
            $scope.propertyToEdit = null;
        });
    };

    $scope.cancelEdit = function() {
        $scope.propertyToEdit = null;
    };

    $scope.sort = {
        active: '',
        descending: undefined
    };

    $scope.changeSorting = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            sort.descending = !sort.descending;
        } else {
            sort.active = column;
            sort.descending = false;
        }
    };

    $scope.getIcon = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            return sort.descending ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
        }

        return 'glyphicon-star';
    };
});

app.controller('propertydetailsCtrl', function($scope, $state, Properties, Tenants) {
    Properties.getPropertyById($state.params.id).then(res => {
        $scope.property = res.data;
        $scope.limit = res.data.bedrooms;
        $scope.currentOccupancy = res.data.tenants.length;
        
        return Tenants.getAvailable();
    }).then(res => {
        $scope.tenants = res.data;
    });
    
    $scope.addTenant = function() {
        $scope.tenantToAdd = true;
    };

    $scope.cancelAdd = function() {
        $scope.tenantToAdd = false;
    };
    
    $scope.saveTenant = function() {
        Properties.addTenant($scope.property._id, $scope.newTenant).then(res => {
            $scope.property = res.data;
            $scope.newTenant = {};
            $scope.tenantToAdd = false;
            $scope.currentOccupancy++;

            return Tenants.getAvailable();
        }).then(res => {
            $scope.tenants = res.data;
        });
    };

    $scope.removeTenant = function(tenant) {
        Properties.removeTenant($scope.property._id, tenant._id).then(res => {
            var index = $scope.property.tenants.indexOf(tenant);
            $scope.property.tenants.splice(index, 1);
            $scope.currentOccupancy--;

            return Tenants.getAvailable();
        }).then(res => {
            $scope.tenants = res.data;
        });
    };
});