const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://mayankv1406_db_user:HVK77PtFLk3ZsHSd@ac-t3orwyv-shard-00-00.eq7tgqg.mongodb.net:27017,ac-t3orwyv-shard-00-01.eq7tgqg.mongodb.net:27017,ac-t3orwyv-shard-00-02.eq7tgqg.mongodb.net:27017/?ssl=true&replicaSet=atlas-rq6cir-shard-0&authSource=admin&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
    .catch((err) => {
    console.log(err);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    //deleting existing data
    await Listing.deleteMany({});
    const newData = initData.data.map((obj) => ({...obj, owner: '6a322d2049ae3db039371802'})); 
    await Listing.insertMany(newData);
    console.log("data was initialized");
};

initDB();
