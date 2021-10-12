"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoManager = void 0;
var mongoose = __importStar(require("mongoose"));
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = "Server";
var MongoManager = /** @class */ (function () {
    function MongoManager() {
    }
    MongoManager.connect = function () {
        mongoose
            .connect(config_1.default.mongo.url, config_1.default.mongo.options)
            .then(function (result) {
            logging_1.default.info(NAMESPACE, "Mongo Connected");
        })
            .catch(function (error) {
            logging_1.default.error(NAMESPACE, error.message, error);
        });
    };
    return MongoManager;
}());
exports.MongoManager = MongoManager;
