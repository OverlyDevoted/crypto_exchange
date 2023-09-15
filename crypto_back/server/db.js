const { MongoClient } = require("mongodb");
module.exports = class DbHandler {
    constructor(uri) {
        this.uri = uri;

        this.client = new MongoClient(this.uri);
    }
    isConnected() {
        return !!this.client && !!this.client.topology && this.client.topology.isConnected()
    }
    async connect(operation) {
        try {
            await this.client.connect();
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            if (operation instanceof Function)
                await operation();
        } finally {
            await this.client.close();
            console.log("Closed deployment.");
        }
    }
    async insertSingle(dbName, collectionName, data) {
        let database;
        let collection;
        await this.connect(async () => {
            database = this.client.db(dbName);
            collection = database.collection(collectionName);
            try {
                await collection.insertOne(data);
            }
            catch (err) {
                console.error(`Something wrong happened while inserting data into the database: ${err}`);
            }
        })
    }
    async find(dbName, collectionName, value) {
        let database;
        let collection;
        let result;
        await this.connect(async () => {
            database = this.client.db(dbName);
            collection = database.collection(collectionName);
            try {
                // console.log(`looking for ${value.user}`)
                const findResult = await collection.findOne(value);
                result = findResult ? findResult.counter : 0;
                console.log("Found the counter of for " + value.cryptocurrency + ": " + result);
            }
            catch (err) {
                console.error(`Something wrong happened while finding: ${err}`);
            }
        })
        return result;
    }
    async update(dbName, collectionName, value) {
        let database;
        let collection;
        await this.connect(async () => {
            database = this.client.db(dbName);
            collection = database.collection(collectionName);
            try {
                // console.log(`looking for ${value.user}`)
                const filter = { user: value.user, cryptocurrency: value.cryptocurrency };
                const result = await collection.updateOne(filter, { $set: { counter: value.counter } });
                console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
            }
            catch (err) {
                console.error(`Something wrong happened while updating: ${err}`);
            }
        })
    }

    async insertSearch(dbName, collectionName, data) {
        let counter = await this.find(dbName, collectionName, data);
        if (counter) {
            counter++;
            await this.update(dbName, collectionName, { user: data.user, cryptocurrency: data.cryptocurrency, counter: counter });
        }
        else {
            await this.insertSingle(dbName, collectionName, { user: data.user, cryptocurrency: data.cryptocurrency, counter: 1 });
        }
    }
}
