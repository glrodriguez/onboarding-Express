import { config } from "dotenv";

config();

export default {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    mongo_uri: process.env.MONGO_URI
}
