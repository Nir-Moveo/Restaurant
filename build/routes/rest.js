"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var rest_1 = __importDefault(require("../controllers/rest"));
var router = express_1.default.Router();
router.post("/create", rest_1.default.createRest);
router.get("/get", rest_1.default.getAllRest);
module.exports = router;
