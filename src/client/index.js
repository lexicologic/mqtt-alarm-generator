const mqtt = require('mqtt');

const { 
    setupErrorHandling, 
    setupMessageProcessing, 
    subscribeToAllTopics 
} = require('./utils');

let client;

// Fully set up client for use by app or tests
// See each util for more descriptions re: setup steps
const connectAndSetupClient = async () => {
    client = mqtt.connect('mqtt://localhost:1883'); 

    subscribeToAllTopics(client);
    setupMessageProcessing(client);
    setupErrorHandling(client);
    
    return client;
};

const publishEvent = (topic, message) => {
    client.publish(topic, message);
};

module.exports = {
    connectAndSetupClient,
    publishEvent,
};