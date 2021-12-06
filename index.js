import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
import order from "./routes/order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI || "mongodb://localhost/saveo-db";

mongoose.connect(URL);
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected!"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server is up!");
});

app.use("/", router);
app.use("/", order);

app.listen(PORT, () => {
  console.log(`Server is running @ ${PORT}.`);
});
