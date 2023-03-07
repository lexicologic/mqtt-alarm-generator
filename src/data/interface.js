// Temporary data store + interface
// Next step would be wiring up to data store e.g. Redis for persistance

const tempDb = {
    "site/123/photovoltaic/skidControlUnits/01A/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/1/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/2/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/3/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/4/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/5/status": "1",
    "site/123/photovoltaic/skidControlUnits/01A/inverters/6/status": "1",
};

const updateDb = (topic, message) => {
    if (tempDb.hasOwnProperty(topic)) {
        tempDb[topic] = message;
    } else {
        tempDb[topic] = message;
    }
};

const checkDb = (topic) => {
    return tempDb[topic];
};

module.exports = {
    checkDb,
    updateDb,
};