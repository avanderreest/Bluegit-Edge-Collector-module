// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
 
// BluegitSystemInformationCollector_135_nodejs_sample/@DeviceInformation_3eb/cloudAndDeviceProperties.js

exports.createBlob = function() {
  return {
    'totalStorage': 0 /* <- try another value! */,
    'totalMemory': 0 /* <- try another value! */,
    'manufacturer': 'Bluegit.com',
    'model': 'Software device Watchdog',
    'swVersion': '1.0.0',
    'osName': 'nvt',
    'processorArchitecture': 'nvt',
    'processorManufacturer': 'nvt',
  };
};

exports.update = function(twin, callback) {
  twin.properties.reported.update(exports.createBlob(), callback);
};