import express from "express";
import { Med } from "../models/saveo.js";
import { Order } from "../models/order.js";

const order = express.Router();

// Order list
order.get("/orders", async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});

// Creating a new order and updating the quantity in medicine db
order.post("/placeorder", async (req, res) => {
  const order = req.body;

  if (order) {
    const result = new Order({ orders: order.order });
    await result.save();

    order.order.forEach(async (ele) => {
      let medsQty = await Med.findOne({ c_batch_no: ele.c_batch_no });

      medsQty.n_balance_qty = medsQty.n_balance_qty - ele.quantity;
      await medsQty.save();
    });

    res.status(200).json({ message: "Order has been placed." });
  } else {
    res.status(404).json({ message: "Invalid Order" });
  }
});

export default order;
