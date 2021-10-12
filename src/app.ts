import express from "express";
import ApiRoutes from "./api/routes";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";

const NAMESPACE = "Server";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: any) {
    this.app = express();
    this.port = port;
    this.initializeRoutes();
  }
  private initializeRoutes() {
    const apiRoutes = new ApiRoutes();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use("/api", apiRoutes.router);
    this.app.get(
      "/api/health",
      (request: Request, response: Response, next: NextFunction) => {
        response.json().status(200);
      }
    );
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      if (req.method == "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
      }

      next();
    });
    this.app.use((req, res, next) => {
      /** Log the req */
      logging.info(
        NAMESPACE,
        `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
      );

      res.on("finish", () => {
        /** Log the res */
        logging.info(
          NAMESPACE,
          `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
        );
      });

      next();
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
export default App;
