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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const register_mentor_1 = require("./controllers/register_mentor");
const getAllStudents_1 = require("./controllers/getAllStudents");
const getStudentsBySubject_1 = require("./controllers/getStudentsBySubject");
const serviceAccount = require("../serviceAccountKeys.json");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 3000;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalis-kalaka.firebaseio.com'
});
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
    // admin.firestore().collection("mivan").add({message: "faszagyerek"});
});
app.post("/register_mentor", bodyParser.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        yield (0, register_mentor_1.register)(payload, register_mentor_1.CollectionType.MENTOR);
        res.status(200).json({ message: "Mentor registered successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred in mentro registered" });
    }
}));
app.post("/register_student", bodyParser.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        yield (0, register_mentor_1.register)(payload, register_mentor_1.CollectionType.STUDENT);
        res.status(200).json({ message: "Student registered successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred in student registered" });
    }
}));
app.get("/getAllStudents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, getAllStudents_1.getAllStudents)();
        res.status(200).json(students);
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while getting all students" });
    }
}));
app.get("/getStudents/:subject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, getStudentsBySubject_1.getStudentsBySubject)(req.params.subject);
        res.status(200).json(students);
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while getting students" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
