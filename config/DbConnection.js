import mongoose from "mongoose";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

if (!DB_CONNECTION_STRING) {
    throw new Error("Missing connection string.");
}

let isConnected = false;

export default async function connectDb() {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(DB_CONNECTION_STRING);
        isConnected = db.connections[0].readyState === 1;
        console.log("Connected with database.");
    } catch (err) {
        console.log("Connection failed.", err);
    }

}