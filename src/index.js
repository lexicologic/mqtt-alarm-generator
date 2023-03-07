const { connectAndSetupClient, publishEvent } = require('./client');
const { checkDb } = require('./data/interface');

const { CHILD_TOPICS, PARENT_TOPIC } = require('./lib/consts');

let client;

const run = async () => {
    client = await connectAndSetupClient();

    // Ensure connection is live before allowing publish of messages
    client.on('connect', () => {
        console.log(`Is client connected: ${client.connected}`);  
        if (client.connected) runEvents();
    });
};

run();

// Can use runEvents function below as entry point for manipulating outside of jest integration
const runEvents = () => {
    publishEvent(CHILD_TOPICS[0], "0");
    setTimeout(()=>{
        console.log('parent topic after event publish: ', checkDb(PARENT_TOPIC));
        shutdownApp();
    }, 3000);
};

const shutdownApp = () => {
    client.on('close', () => {
        process.exit();
    });
    client.end();
};