const { connectAndSetupClient, publishEvent } = require('./client');
const { checkDb, updateDb } = require('./data/interface');

const { CHILD_TOPICS, PARENT_TOPIC } = require('./lib/consts');

jest.setTimeout(10000);

describe('fractal-mqqt-alarm-generator', () => {
    let client;
    beforeAll(()=>{
        return new Promise(async(resolve) => {
            client = await connectAndSetupClient();
            client.on('connect', () => {
                console.log('Client connected?: ', client.connected);  
                if (client.connected) resolve();
            });
        });
    });

    afterAll(()=>{
        return new Promise(async(resolve) => {
            client.on('close', () => {
                resolve();
            });
            client.end();
        });
    });

    it('should trip parent topic to 0 if child status is set to 0', (done) => {
        publishEvent(CHILD_TOPICS[0], "0");
        
        setTimeout(() => {
            expect(checkDb(PARENT_TOPIC)).toBe("0");
            done();
        }, 5000);
    });

    it('should trip parent topic to 1 if child status is set to 1 and all other child statuses are 1', (done) => {
        updateDb(CHILD_TOPICS[0], "0");
        publishEvent(CHILD_TOPICS[0], "1");
        
        setTimeout(() => {
            expect(checkDb(PARENT_TOPIC)).toBe("1");
            done();
        }, 5000);
    });

    it('should NOT trip parent topic to 1 if child status is set to 1 when other child statuses are 0', (done) => {
        updateDb(CHILD_TOPICS[0], "0");
        updateDb(CHILD_TOPICS[1], "0");
        publishEvent(CHILD_TOPICS[0], "1");
        
        setTimeout(() => {
            expect(checkDb(PARENT_TOPIC)).toBe("1");
            done();
        }, 5000);
    });
});