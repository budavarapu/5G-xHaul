/*
 * Copyright (c) 2017 highstreet technologies GmbH and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */

define(['app/onapAai/onapAai.module', 'app/mwtnCommons/mwtnCommons.services'], function (onapAaiApp) {

  onapAaiApp.register.factory('$onapAai', function ($q, $http, ENV, Base64, $mwtnCommons, $mwtnDatabase, $mwtnLog, Device) {

    var service = {};

    var functionId = "mwtn";
    var docType = "device";
    var from = 0;
    var size = 9999;
    var sort = undefined;
    var deviceLookup = {};
    $mwtnDatabase.getAllData(functionId, docType, from, size, sort).then(
      function successCallback(response) {
        response.data.hits.hits.map(function(device){
          deviceLookup[device._id] = new Device(device._source);
        });
      }, function errorCallback(response) {
        deviceLookup = {};
      });

    service.checkModules = $mwtnCommons.checkModules;
    service.getMmwtnWebSocketUrl = $mwtnCommons.getMmwtnWebSocketUrl;
    service.gridOptions = $mwtnCommons.gridOptions;
    service.formatData = $mwtnCommons.formatData;
    service.formatTimeStamp = $mwtnCommons.formatTimeStamp;
    service.deleteDocType = $mwtnDatabase.deleteDocType;
    service.odlKarafVersion = $mwtnCommons.odlKarafVersion;

    var transactionId = 1;
    var getHeaders = function () {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

        "Access-Control-Allow-Credentials": "true",
        'Access-Control-Allow-Origin': '*',

        'Authorization': 'Basic ' + Base64.encode('AAI:AAI'),
        'X-FromAppId': 'SDNR',
        'X-TransactionId': transactionId++
      }
    };

    // create or modify a pnf in aai
    service.createPnf = function (pnfId, doc) {
      var base = ENV.getBaseURL('MD_SAL').replace(':8181', ':8282');
      var getIp = function (extension) {
        return extension.filter(function (item) {
          return item['value-name'] === 'neIpAddress';
        }).map(function (item) {
          return item.value;
        })[0];
      }

      var device = deviceLookup[pnfId];
      var data = {
        "pnf-name": pnfId,
        "pnf-id": doc.connect.host + ':' + doc.connect.port,
        "equip-type": device.getType(),
        "equip-model": device.getModel(),
        "equip-vendor": device.getVendor(),
        "ipaddress-v4-oam": getIp(doc['core-model:network-element'].extension) | doc.connect.host,
        "in-maint": false
      };
      console.info('pnf', data);
      var request = {
        method: 'PUT',
        url: base + '/aai/aai/v8/network/pnfs/pnf/' + pnfId, // to es config
        // withCredentials: true,
        headers: getHeaders(),
        data: data
      };
      var deferred = $q.defer();
      $http(request).then(function successCallback(response) {
        deferred.resolve(response);
      }, function errorCallback(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    service.deletePnf = function (pnfId) {
      // curl -X DELETE http://localhost:8282/aai/aai/v8/network/pnfs/pnf/Ericsson-A1 --insecure -v -u AAI:AAI -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'X-FromAppId: SDNR' -H 'X-TransactionId: 9999'
      var base = ENV.getBaseURL('MD_SAL').replace(':8181', ':8282');
      var request = {
        method: 'DELETE',
        url: base + '/aai/aai/v8/network/pnfs/pnf/' + pnfId, // to es config
        // withCredentials: true,
        headers: getHeaders()
      };
      var deferred = $q.defer();
      $http(request).then(function successCallback(response) {
        deferred.resolve(response);
      }, function errorCallback(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    service.getAaiPnfs = function () {
      // curl https://10.31.1.61:8443/aai/v8/network/pnfs -k -v -u AAI:AAI -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'X-FromAppId: SDNR' -H 'X-TransactionId: 9999'

      var base = ENV.getBaseURL('MD_SAL').replace(':8181', ':8282');
      console.log(base);
      var request = {
        method: 'GET',
        url: base + '/aai/aai/v8/network/pnfs', // to es config
        // withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

          "Access-Control-Allow-Credentials": "true",
          'Access-Control-Allow-Origin': '*',

          'Authorization': 'Basic ' + Base64.encode('AAI:AAI'),
          'X-FromAppId': 'SDNR',
          'X-TransactionId': 9999
        },
      };

      var deferred = $q.defer();
      $http(request).then(function successCallback(response) {
        deferred.resolve(response);
      }, function errorCallback(response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    return service;
  });

  // Class Device
  onapAaiApp.register.factory('Device', function () {
    var Device = function (data) {
      if (!data) {
        data = {id:new Date(), type: 'unknown', name:'unknonw', model: 'unkonwn', vendor:'unknonw', version:'unkonwn'};
      }
      this.data = data;
      this.getData = function () {
        return this.data;
      };
      this.getId = function () {
        return this.getData().id;
      };
      this.getType = function () {
        return this.getData().type;
      };
      this.getName = function () {
        return this.getData().name;
      };
      this.getModel = function () {
        return this.getData().model;
      };
      this.getVendor = function () {
        return this.getData().vendor;
      };
      this.getVersion = function () {
        return this.getData().version;
      };
    };
    return Device;
  });

});
