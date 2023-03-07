const { checkDb, updateDb } = require('../data/interface');

const { CHILD_TOPICS, PARENT_TOPIC } = require('../lib/consts');

const setupErrorHandling = (client) => {
    // Ensure any errors on processing are logged
    client.on('error', (error) => {
        console.error(error);
    });
};

const setupMessageProcessing = (client) => {
    client.on('message', (topic, message) => {
        // Update data store on incoming messages
        updateDb(topic, message.toString());

        // Confirm we are only concerned with this specific parent/child set
        // Would be more dynamic detection in a more complex system 
        if (CHILD_TOPICS.indexOf(topic) !== -1) { 
            // Ensure any child topic update of 0 sets parent topic to 0
            if (message.toString() === "0") {
                client.publish(PARENT_TOPIC, "0");
            } else if (message.toString() === "1") {
                // Check data store to see if all other child topics are status 1
                // before updating parent topic status to 1
                const shouldUpdateParent = CHILD_TOPICS.every(topic => {
                    if(checkDb(topic)=== "0") {
                        return false;
                    }
                    return true;
                });
                if (shouldUpdateParent) client.publish(PARENT_TOPIC, "1");
            }
        }
    });
};

// Subscribe to all topics to ensure message processing hook receives messages
const subscribeToAllTopics = (client) => {
    CHILD_TOPICS.concat([PARENT_TOPIC]).forEach((topic) => client.subscribe(topic));
};

module.exports = {
    setupErrorHandling,
    setupMessageProcessing,
    subscribeToAllTopics,
};
