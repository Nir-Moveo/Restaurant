"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose_init_1 = require("./db/mongoose-init"); // apply connection
mongoose_init_1.MongoManager.connect();
var port = process.env.PORT || 3000;
var app = new app_1.default(port);
app.listen();
