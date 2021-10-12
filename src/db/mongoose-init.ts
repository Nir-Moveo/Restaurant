import mongoose from "mongoose";
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = "Server";

export class MongoManager {
  public static connect() {
    mongoose
      .connect(config.mongo.url, config.mongo.options)
      .then((result) => {
        logging.info(NAMESPACE, "Mongo Connected");
      })
      .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
      });
  }
}
