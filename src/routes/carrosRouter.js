import express from "express";

import { createCarro, deleteCarro, getAllCarros, getCarrosById, updateCarro } from "../controllers/controllerCarros.js"

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarrosById);
router.post("/", createCarro);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro)

export default router