"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var v1_routes_1 = __importDefault(require("./v1/v1.routes"));
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    ApiRoutes.prototype.initializeRoutes = function () {
        this.router.use("/v1/", v1_routes_1.default.router);
    };
    return ApiRoutes;
}());
exports.default = ApiRoutes;
