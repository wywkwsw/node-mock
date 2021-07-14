var {MongoClient,Db} = require('mongodb');
// var url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

function mongodb_init(url,dbname) {
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    client.connect();
    const database = client.db(dbname);
    return database
}
module.exports = mongodb_init