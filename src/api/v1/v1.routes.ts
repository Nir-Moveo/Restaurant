import express, { Router } from "express";
import Restrouter from "./rest/rest.route";
import Dishrouter from "./dish/dish.route";

   const v1router: Router = express.Router();

   v1router.use('/rest', Restrouter)
   v1router.use('/dish', Dishrouter)

export = v1router;
