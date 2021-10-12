import express from "express";
import v1router from "./v1/v1.routes";

class ApiRoutes {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.use("/v1", v1router);
  }
}

export default ApiRoutes;
