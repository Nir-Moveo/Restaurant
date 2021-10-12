"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./api/routes"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var NAMESPACE = "Server";
var App = /** @class */ (function () {
    function App(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeRoutes();
    }
    App.prototype.initializeRoutes = function () {
        var apiRoutes = new routes_1.default();
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use("/api/", apiRoutes.router);
        this.app.get("/api/health", function (request, response, next) {
            response.json().status(200);
        });
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method == "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }
            next();
        });
        this.app.use(function (req, res, next) {
            /** Log the req */
            logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
            res.on("finish", function () {
                /** Log the res */
                logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
            });
            next();
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    return App;
}());
exports.default = App;
