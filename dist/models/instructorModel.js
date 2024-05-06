"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    instructor: [{ type: mongoose_1.default.Types.ObjectId, ref: "Instructor" }],
}, { timestamps: true });
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
