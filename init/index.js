const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
    const newData = initData.data.map((obj) => ({...obj, owner: '6a2d895ef18f65ef5d746fb5'})); 
    await Listing.insertMany(newData);
    console.log("data was initialized");
};

initDB();
