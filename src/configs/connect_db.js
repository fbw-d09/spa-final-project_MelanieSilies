import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);
/* 
Den Datenbanknamen übergeben wir hier getrennt von der URI,
als zweites Argument in der connect-Methode.
*/
mongoose
   .connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE,
   })
   .then(() => console.log("Connected to mongoDB"));