import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import './configs/connect_db.js';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

//import der Routen
import stellplaetzeRouter from "./routes/stellplaetzeRouter.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

//Routen verknüpfen
app.use("/api", stellplaetzeRouter);

// Errorhandling für nicht vorhandene Routen
app.use((req, res)=>{
    res.status(404).json({msg:"Page not found"});
});

//App starten
app.listen(port, () => console.log("Server is running on port: " + port));