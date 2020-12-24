// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

// BluegitSystemInformationCollector_135_nodejs_sample/@SystemInformationCollectorV2_40y/cloudAndDeviceProperties.js

exports.createBlob = function() {
    return {
  
    };
  };
  
  exports.update = function(twin, callback) {
    twin.properties.reported.update(exports.createBlob(), callback);
  };
  
  exports.process = function(twin, data) {
    for (var key in data) {
      if (!data.hasOwnProperty(key)) continue;
      if (key == '$version') continue;
  
      var prop = data[key];
      if (!prop.hasOwnProperty('value')) continue;
  
      var value = prop.value;
      switch(key) {
      case 'SendingFrequency':
        console.log(new Date(), 'SendingFrequency is updated to', value, '');
        break;
  
      case 'DeviceOwner':
        console.log(new Date(), 'DeviceOwner is updated to', value, '');
        break;
  
      case 'Location':
        console.log(new Date(), 'Location is updated to', value, '');
        break;
      default:
        console.error(new Date(), 'WARNING!: unknown property', key, 'with value', value, 'is received.');
        return;
      }
  
      // respond back to ackowledge that the desired property is processed by the client
      if (!data.hasOwnProperty('statusCode')) {
        var message = {};
        message[key] = {'value': value};
        message[key]['statusCode'] = 200;
        message[key]['status'] = 'completed';
        message[key]['desiredVersion'] = data['$version'];
        twin.properties.reported.update(message, function() {});
      }
    }
  };
  