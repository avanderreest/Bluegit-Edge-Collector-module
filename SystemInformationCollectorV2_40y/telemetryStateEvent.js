// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

// BluegitSystemInformationCollector_135_nodejs_sample/@SystemInformationCollectorV2_40y/telemetryEventState.js
 
const si = require('systeminformation');
var Message = require('azure-iot-device').Message;

exports.createBlob = function() {
  
  return {
    'CPUCoresTemperature': 'Arnoud update here',
    'CPUMaxTemperature': 30 ,
    'CPUMainTemperature': 4.44443,
    'CPUSpeedAvg': 4.2,

  };
};


exports.send = async(client, callback) => {

  try {
    const cpuTempData =  si.cpuTemperature();
    const cpuSpeedData = si.cpuCurrentspeed();
    const cpuCachepData = si.cpuCache();
    const memData =  si.mem();
    const batteryData =  si.battery();
    const loadData =  si.currentLoad();
    const fullLoadData =  si.fullLoad();
    const fsSizeData =  si.fsSize();
    const processesData =  si.processes();
    const dockerInfo =  si.dockerInfo();
    const data = await Promise.all([cpuTempData,cpuSpeedData,cpuCachepData,memData, batteryData, loadData,fullLoadData,fsSizeData,processesData,dockerInfo]);


      // console.log(data); 
      // Create Payload message
      msgPayload = {

        // Model definition for DCM Plug and Play
        //'modelInformation': is Object check format,


        // CPU Temperature data
        'CPUCoresTemperature': data[0].cores ,
        'CPUMaxTemperature': data[0].max,
        'CPUMainTemperature': data[0].main,
        // CPU Speed data
        'CPUSpeedAvg': data[1].avg,
        'CPUSpeedMin': data[1].min,
        'CPUSpeedMax': data[1].max,
        // CPU Cache data
        'CPUCacheL1d': data[2].l1d,
        'CPUCacheL1i': data[2].l1i,
        'CPUCacheL2': data[2].l2,
        'CPUCacheL3': data[2].l3,
        // Memory data
        'MemoryTotal': data[3].total,
        'MemoryFree': data[3].free,
        'MemoryUsed':  data[3].used,
        'MemoryActive':  data[3].active,
        'MemoryAvailable':  data[3].available,
        'MemoryBuffers':  data[3].buffers,
        'MemoryCached':  data[3].cached,
        'MemorySlab':  data[3].slab,
        'MemoryBufferCache':  data[3].buffcache,
        'MemorySwapTotal':  data[3].swaptotal,
        'MemorySwapUsed':  data[3].swapused,
        'MemorySwapFree':  data[3].swapfree,

        // Battery data
        'HasBattery': data[4].hasbattery,
        'BatteryCycleCount': data[4].cyclecount,
        'BatteryIsCharging': data[4].ischarging,
        'BatteryDesignedCapacity': data[4].designedcapacity,
        'BatteryMaxCapacity': data[4].maxcapacity,
        'BatteryCurrentCapacity': data[4].currentcapacity,
        'BatteryVoltage': data[4].voltage,
        'BatteryCapacityUnit': data[4].capacityUnit,
        'BatteryPercent': data[4].percent,
        'BatteryTimeRemaining': data[4].timeremaining,
        'BatteryAcConnected': data[4].acconnected,
        'BatteryType': data[4].type,
        'BatteryModel': data[4].model,
        'BatteryManufacturer': data[4].manufacturer,
        'BatterySerial': data[4].serial,

        // Load Data
        'CurrentLoadAvg': data[5].avgload,
        'CurrentLoad': data[5].currentload,
        'CurrentLoadUser': data[5].currentload_user,
        'CurrentLoadSystem': data[5].currentload_system,
        'CurrentLoadNice': data[5].currentload_nice,
        'CurrentLoadIdle': data[5].currentload_idle,
        'CurrentLoadIrq': data[5].currentload_irq,
        'CurrentLoadRaw': data[5].raw_currentload,
        'CurrentLoadUserRaw': data[5].raw_currentload_user,
        'CurrentLoadSystemRaw': data[5].raw_currentload_system,
        'CurrentLoadNiceRaw': data[5].raw_currentload_nice,
        'CurrentLoadIdleRaw': data[5].raw_currentload_idle,
        'CurrentLoadIrqRaw': data[5].raw_currentload_irq,

        // Full Load data
        'CurrentFullLoad': data[6],

        // File system data
        'FileSystem': data[7][0].fs,
        'FileSystemType': data[7][0].type,
        'FileSystemSize': data[7][0].size,
        'FileSystemUsedInBytes': data[7][0].used,
        'FileSystemUse': data[7][0].use,
        'FileSystemMount': data[7][0].mount,  
        
        // Process data
        'ProcessesAll': data[8].all,
        'ProcessesRunning': data[8].running,
        'ProcessesBlocked': data[8].blocked,
        'ProcessesSleeping': data[8].sleeping,
        'ProcessesUnknown': data[8].unknown,

        // Docker Info
        'DockerContainersRunning': data[9].containersRunning,
        'DockerContainersPaused': data[9].containersPaused

        //'totalStorage': 15 /* <- try another value! */,
        //'totalMemory': 23 /* <- try another value! */,
        //'manufacturer': data.manufacturer,
        //'model': data.brand,
        //'swVersion': '0.001',
        //'osName': data,
        //'processorArchitecture': 'Geen idee',
        // 'processorManufacturer': 'Apple computers',
      };

    
    var message = new Message(JSON.stringify(msgPayload));
    // console.log(message);
    client.sendEvent(message, callback);
  } catch (e) {
    console.log(e);
  }


 // var message = new Message(JSON.stringify(exports.createBlob()));
 // client.sendEvent(message, callback);

}
/*
exports.send = function(client, callback) {




  var message = new Message(JSON.stringify(exports.createBlob()));
  client.sendEvent(message, callback);
};
*/