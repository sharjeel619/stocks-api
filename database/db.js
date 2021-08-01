const MongoClient = require('mongodb').MongoClient;
const { mongodb_user, mongodb_password } = process.env;
const connectionUrl = `mongodb+srv://${mongodb_user}:${mongodb_password}@portfolio.rgkjp.mongodb.net/test?authSource=admin&replicaSet=atlas-8jsjvx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
const dbName = 'Syrup';

const initDB = async () => {
  try {
    let client = await MongoClient.connect(connectionUrl);
    let db = client.db(dbName);
    return [db, client];
  } catch (err) {
    console.log(err.stack);
  }
}
const getStockByName = async (stock_name, cb) => {
  let [db, client] = await initDB();
  try {
    const result = await db.collection('Stock').find({ 'name': stock_name }).toArray();
    return { "result": result };
  }
  catch (err) {
    return { "error": err };
  }
  finally {
    client.close();
  }
}
const getAllStockNames = async () => {
  let [db, client] = await initDB();
  try {
    const result = await db.collection('Stock').distinct('name');
    return { "result": result };
  }
  catch (err) {
    console.log(err);
    return { "error": err };
  }
  finally {
    client.close();
  }

}

module.exports = { getStockByName, getAllStockNames };
