## Device Monitoring Twin Application for the Bluegit Device Control Center service
This application is part of the Bluegit Device control center service platform.

This application can be run on an IoT Edge Runtime device in 3 modes: 


## As a Standalone node module.

-	Clone this repository to your device
-	Modify the credentials in the config/config.json file
-	Start the application Node app.js

## As a Standalone docker container.

-	Pull the docker image from the Github package repository (see packages)
-	Make sure to select the right package for the architecture the container will run on
-	On the client create the dicrecory /etc/iotedge/infocollector
-	Copy the /config/config.json the /etc/iotedge/infocollector
-	Modify the credentials in the /etc/iotedge/infocollector /config.json file
-	Start the container (IMPORTANT: Below his is an example Make sure you have the right build!!):

sudo docker run -d -v "/etc/iotedge/infocollector":/app/config ghcr.io/avanderreest/infocollector:latest@sha256:9a498b5f60a7199571aea3fc6469f0ca7029b8021bac6c11e472c64c43dc7060


### Requirements

Docker

node.js version 8+
 
### Setup

`cd` into sample application folder and
```
npm install
```

### Run

```
node main.js
```

Docker image build