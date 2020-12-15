// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

// BluegitSystemInformationCollector_135_nodejs_sample/connection.js

var iotHubTransport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
  
var ProvisioningTransport = require('azure-iot-provisioning-device-mqtt').Mqtt;
var SymmetricKeySecurityClient = require('azure-iot-security-symmetric-key').SymmetricKeySecurityClient;
var ProvisioningDeviceClient = require('azure-iot-provisioning-device').ProvisioningDeviceClient;

// connect to Azure IoT DPS (device provisioning service)
var provisioningHost = 'global.azure-devices-provisioning.net';

exports.connect = function(scopeId, deviceId, key, callback) {
  var provisioningSecurityClient = new SymmetricKeySecurityClient(deviceId, key);
  var provisioningClient = ProvisioningDeviceClient.create(provisioningHost, scopeId, new ProvisioningTransport(), provisioningSecurityClient);

  // Register the device.
  provisioningClient.register(function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      var connectionString = 'HostName=' + result.assignedHub + ';DeviceId=' + result.deviceId + ';SharedAccessKey=' + key;
      var hubClient = Client.fromConnectionString(connectionString, iotHubTransport);

      hubClient.open(function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, hubClient);
        }
      });
    }
  });
};
