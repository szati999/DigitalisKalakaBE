import express from 'express'
import * as admin from 'firebase-admin';
import { register, CollectionType} from './controllers/register_mentor';
import { getAllStudents } from './controllers/getAllStudents';

const serviceAccount = require("../serviceAccountKeys.json");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalis-kalaka.firebaseio.com'
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
    // admin.firestore().collection("mivan").add({message: "faszagyerek"});
})

app.post("/register_mentor", bodyParser.json(), async (req, res) => {
    try {
        const payload = req.body;
        await register(payload, CollectionType.MENTOR);
        res.status(200).json({message: "Mentor registered successfully!"});
    } catch(err) {
        res.status(500).json({message: "An error occurred in mentro registered"});
    }
});

app.post("/register_student", bodyParser.json(), async (req, res) => {
    try {
        const payload = req.body;
        await register(payload, CollectionType.STUDENT);
        res.status(200).json({message: "Student registered successfully!"});
    } catch(err) {
        res.status(500).json({message: "An error occurred in student registered"});
    }
});

app.get("/getAllStudents", async (req, res) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    }catch(err) {
        res.status(500).json({message: "An error occurred while getting all students"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})