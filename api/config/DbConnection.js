import mongoose from "mongoose";
import "dotenv/config";

const DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

async function databaseConnector() {
    mongoose.connect(DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default databaseConnector;