// db.js
import { Sequelize } from "sequelize";
import 'dotenv/config';



const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST) {
  throw new Error("Missing required environment variables. Please check your .env file.");
}

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
      host: DB_HOST,
      dialect: "mysql",
      port: Number(DB_PORT), // or your custom port if applicable
    }
);

// Database authentication and sync logic in the same file
export const initializeDatabase = async () => {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    console.log("Database connected");

    // Sync models (Optional but recommended for updates)
    // sync the [ entity - model ] files , and see if they're not in the db, create tables for these files
    // and if they're exists in the database, just ignore it .
    // [ force: true ] => this line means it gonna to db and delete all tables and create them from scratch , so should set to false
    // [ alter: true ] => if you already create the table and after some time you gonna add a new field in the table , this option when it has true value makes the changes happen in the db
    await sequelize.sync({ force: false, alter: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Stop the app if DB connection fails
  }
};
