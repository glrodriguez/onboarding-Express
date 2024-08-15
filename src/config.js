import { config } from "dotenv";

// Loads .env file contents into process.env by default
config();

export default {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  mongo_uri: process.env.MONGO_URI
}
