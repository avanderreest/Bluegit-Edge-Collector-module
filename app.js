// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

// BluegitSystemInformationCollector_135_nodejs_sample/main.js

var config = require('./config/config.json');

var connection = require('./connection.js');
const { update } = require('./DeviceInformation_3eb/cloudAndDeviceProperties.js');
  
var DeviceInformation_3eb = {
  'property' : require('./DeviceInformation_3eb/cloudAndDeviceProperties.js')
}; 

var SystemInformationCollectorV2_40y = {
  'telemetry' : require('./SystemInformationCollectorV2_40y/telemetryStateEvent.js'),
  'property' : require('./SystemInformationCollectorV2_40y/cloudAndDeviceProperties.js')
};

// Credentials are obtained from a .env file
var scopeId = config.Credentials.SCOPEID;
var deviceId = config.Credentials.DEVICEID;
var key = config.Credentials.KEY;

// Default Sending frequency
var dataInterval = 86400000;
var dataIntervalID;


connection.connect(scopeId, deviceId, key, function (err, device) {
  if (err) {
    console.error(new Date(), 'Error:', err);
    process.exit(1);
  }

  console.log(new Date(), 'Connected!');

  // process device events
  device.on('error', function (err) {
    console.error(new Date(), 'Error:', err.message);
    process.exit(-1);
  });


// there was no device command definition for the device

  device.getTwin(function(err, twin) {
    if (err) {
      console.error('could not get twin');
      process.exit(-1);
    }

    twin.on('properties.desired', function(twin_data) {
      console.log(new Date(), 'new desired properties received.');
      SystemInformationCollectorV2_40y.property.process(twin, twin_data);

      for (var key in twin_data) {
        if (!twin_data.hasOwnProperty(key)) continue;
        if (key == '$version') continue;

        var prop = twin_data[key];
        if (!prop.hasOwnProperty('value')) continue;

        var value = prop.value;
        switch (key) {
          case 'SendingFrequency':
            
            console.log(new Date(), 'ThrottleSpeed is updated to', value, '');
            dataInterval = value * 1000 * 60;  //Setting throttle speed from minutes to miliseconds.
           
            stopSending(dataIntervalID);
            if (dataInterval <= 0) {
              console.log("Error! Invalid throttle speed set. Restoring throttle speed to default.");
              dataInterval = 86400000;
            }
            dataIntervalID = startSendingData(dataInterval);
            break;

 
          default:
            // console.error(new Date(), 'WARNING!: unknown property', key, 'with value', value, 'is received.');
        }
      }
    });

    var startSendingData = function () {
      dataIntervalID = setInterval(function () {
         // sending telemetry for SystemInformationCollectorV2_40y interface
         SystemInformationCollectorV2_40y.telemetry.send(device, function(e) { message_callback(e, 'telemetry', 'SystemInformationCollectorV2_40y'); });
      }, dataInterval);
      return dataIntervalID;
    };


    var stopSending = function (interval) {
      clearInterval(interval);
      intervalID = null;
    };

    // Sent Devide Device Information Properties update for DeviceInformation_3eb interface
    DeviceInformation_3eb.property.update(twin, function(e) { message_callback(e, 'telemetry', 'DeviceInformation_3eb'); }); 

    var message_callback = function(e, what, name) {
      if (e) {
        console.error('Error:', e);
      } else {
        console.log(new Date(), what, 'for', name, 'interface is sent.');
      }
    };

  
  });
});
