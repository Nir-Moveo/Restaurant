import express from "express";
import controller from "./dish.controller";


const Dishrouter = express.Router();

Dishrouter.post("/create/:id", controller.createDish);
Dishrouter.post("/update/:id", controller.uptadeDish)
Dishrouter.delete("/delete/:Did/:Rid", controller.deleteDish);

export = Dishrouter;
