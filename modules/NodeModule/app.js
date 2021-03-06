'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

var temperatureThreshold = 25;

var SystemInformationCollectorV2_40y = {
  'telemetry' : require('./SystemDataCollector/telemetryStateEvent.js'),
  'property'  : require('./SystemDataCollector/cloudAndDeviceProperties.js')
};

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          filterMessage(client, inputName, msg);
          });

          client.getTwin(function (err, twin) {
            if (err) {
                console.error('Error getting twin: ' + err.message);
            } else {
                twin.on('properties.desired', function(delta) {
                    if (delta.TemperatureThreshold) {
                        temperatureThreshold = delta.TemperatureThreshold;
                    }
                });
            }
        });



      }
    });
  }
});

// This function filters out messages that report temperatures below the temperature threshold.
// It also adds the MessageType property to the message with the value set to Alert.
function filterMessage(client, inputName, msg) {
  client.complete(msg, printResultFor('Receiving message'));
  if (inputName === 'input1') {
      var message = msg.getBytes().toString('utf8');

console.log('Message recived', message)

      var messageBody = JSON.parse(message);
      if (messageBody && messageBody.machine && messageBody.machine.temperature && messageBody.machine.temperature > temperatureThreshold) {
          console.log(`Machine temperature ${messageBody.machine.temperature} exceeds threshold ${temperatureThreshold}`);
          var outputMsg = new Message(message);
          outputMsg.properties.add('MessageType', 'Alert');
          console.log('Output message', outputMsg)
          client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message'));
      }
  }
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
