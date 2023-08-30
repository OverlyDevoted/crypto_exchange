const { MongoClient } = require("mongodb");
module.exports = class DbHandler {
    constructor(uri) {
        this.uri = uri;
        this.client = new MongoClient(this.uri);
    }
    async connect() {
        try {
            await this.client.connect();
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            await this.client.close();
            console.log("Closed deployment.");
        }
    }
}
