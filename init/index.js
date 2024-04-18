const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

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

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '6609cdae9369a519527df8b0'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");

    // const listingsWithImages = initData.data.map((obj) => {
    //     const filename = obj.image.url.split('/').pop(); // Extract filename from URL
    //     return {...obj, owner: "66090539f707ca4269c2575a", "image[filename]": filename}; // Add filename to the object
    // });

    // // Insert the modified data into the database
    // await Listing.insertMany(listingsWithImages);
    // console.log("data was initialised");

};

initDB();