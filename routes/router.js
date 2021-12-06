import express from "express";
import { Med } from "../models/saveo.js";
import csvtojson from "csvtojson";
import upload from "../multerUpload.js";
import fs from "fs";

const router = express.Router();

// Converting from csv to json and inserting the data to db
router.post("/uploadCSV", upload.single("fileName"), async (req, res) => {
  const file = req.file;

  const converted = await csvtojson().fromFile(file.path);

  const arrayList = [];

  for (let i = 0; i < converted.length; i++) {
    const individualRow = {
      c_name: converted[i]["c_name"],
      c_batch_no: converted[i]["c_batch_no"],
      d_expiry_date: converted[i]["d_expiry_date"],
      n_balance_qty: converted[i]["n_balance_qty"],
      c_packaging: converted[i]["c_packaging"],
      c_unique_code: converted[i]["c_unique_code"],
      c_schemes: converted[i]["c_schemes"],
      n_mrp: converted[i]["n_mrp"],
      c_manufacturer: converted[i]["c_manufacturer"],
      hsn_code: converted[i]["hsn_code"],
    };

    arrayList.push(individualRow);
  }

  Med.insertMany(arrayList, (err, result) => {
    if (result) {
      fs.unlink(file.path, (err) => {
        if (err) {
          throw err;
        } else {
          console.log("File removed from the local DB.");
        }
      });

      res.status(200).json({ message: "CSV file has been imported to DB" });
    } else {
      res.json({ message: err });
    }
  });
});

// Searching a medicine by it's name
router.get("/searchMedicine/:name", async (req, res) => {
  const { name } = req.params;

  const result = await Med.find({ c_name: { $regex: name.toUpperCase() } });

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json(err);
  }
});

// searching a medicine by it's unique id
router.get("/getMedicineDetails/:c_unique_code", async (req, res) => {
  const { c_unique_code } = req.params;

  const result = await Med.find({ c_unique_code: c_unique_code });

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json(err);
  }
});

export default router;
