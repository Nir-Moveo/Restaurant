"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var rest_1 = __importDefault(require("../models/rest"));
var createRest = function (req, res, next) {
    var _a = req.body, author = _a.author, title = _a.title;
    var rest = new rest_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author: author,
        title: title,
    });
    return rest
        .save()
        .then(function (result) {
        return res.status(201).json({
            rest: result,
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    });
};
var getAllRest = function (req, res, next) {
    rest_1.default.find()
        .exec()
        .then(function (rests) {
        return res.status(200).json({
            rests: rests,
            count: rests.length,
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    });
};
exports.default = { createRest: createRest, getAllRest: getAllRest };
