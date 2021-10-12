import express from "express";
import controller from "./rest.controller";


const Restrouter = express.Router();

Restrouter.post("/create", controller.createRest);
Restrouter.get("/get", controller.getAllRest);
Restrouter.get("/get/:id", controller.getRest);
Restrouter.put("/update/:id", controller.uptadeRest)
Restrouter.delete("/delete/:id", controller.deleteRest);

export = Restrouter;
