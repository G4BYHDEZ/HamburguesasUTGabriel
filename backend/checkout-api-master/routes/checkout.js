import { Router } from "express";
import { checkout } from "../controller/checkout.js";

const router = Router();

router.post("/", checkout);

export default router;