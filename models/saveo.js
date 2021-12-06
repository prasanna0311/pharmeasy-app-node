import mongoose from "mongoose";

const saveoSchema = new mongoose.Schema({
  c_name: { type: String, required: true },
  c_batch_no: { type: String, required: true },
  d_expiry_date: { type: Date, required: true },
  n_balance_qty: { type: Number, required: true },
  c_packaging: { type: String, required: true },
  c_unique_code: { type: String, required: true },
  c_schemes: { type: String },
  n_mrp: { type: Number, required: true },
  c_manufacturer: { type: String, required: true },
  hsn_code: { type: Number, required: true },
});

export const Med = mongoose.model("Med", saveoSchema);
