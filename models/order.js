import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orders: [
    {
      c_unique_code: { type: Number, required: true },
      c_batch_no: { type: String, required: true },
      quantity: { type: Number, required: true },
      c_name: { type: String, required: true },
    },
  ],
  order_date: { type: Date, default: Date.now(), required: true },
});

export const Order = mongoose.model("Order", orderSchema);
