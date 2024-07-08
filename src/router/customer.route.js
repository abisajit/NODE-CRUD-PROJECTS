import express from "express";
import {
  findCustomer,
  postCustomer,
} from "../controller/customer.controller.js";

const route = express.Router();

route.get("/", findCustomer);
route.post("/", postCustomer);

export default route;
