import express from 'express'
import * as admin from 'firebase-admin';
import { register, CollectionType} from './controllers/register_mentor';
import { getAllStudents, getPending } from './controllers/getAllStudents';
import { getStudentsBySubject } from './controllers/getStudentsBySubject';
import { assignStudent } from './controllers/assignStudent';

const serviceAccount = require("../serviceAccountKeys.json");
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express();
const PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalis-kalaka.firebaseio.com'
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.get("/", (req, res) => {
    res.send("Hello World!");
    // admin.firestore().collection("mivan").add({message: "faszagyerek"});
})

app.post("/register_mentor", bodyParser.json(), async (req, res) => {
    try {
        const payload = req.body;
        const id = await register(payload, CollectionType.MENTOR);
        res.status(200).json(id);
    } catch(err) {
        res.status(500).json({message: "An error occurred in mentro registered"});
    }
});

app.post("/register_student", bodyParser.json(), async (req, res) => {
    try {
        const payload = req.body;
        const id = await register(payload, CollectionType.STUDENT);
        res.status(200).json(id);
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

app.get("/getStudents/:subject", async (req, res) => {
    try {
        const students = await getStudentsBySubject(req.params.subject);
        res.status(200).json(students);
    }catch(err) {
        res.status(500).json({message: "An error occurred while getting students"});
    }
})

app.post("/assignStudentToMentor", bodyParser.json(), async (req, res) => {
    try {
        const payload = req.body;
        await assignStudent(payload);
        res.status(200).json({message: "Student assigned successfully!"});
    }catch(err) {
        res.status(500).json({message: "An error occurred while assigning student to Mentor"});
    }
})

app.get("/getPendingMentors", async (req, res) => {
    try {
        const pendingMentors = await getPending(CollectionType.MENTOR);
        res.status(200).json(pendingMentors);
    }catch(err) {
        res.status(500).json({message: "An error occurred while getting the pending Mentors"});
    }
})

app.get("/getPendingStudents", async (req, res) => {
    try {
        const pendingStudents = await getPending(CollectionType.STUDENT);
        res.status(200).json(pendingStudents);
    }catch(err) {
        res.status(500).json({message: "An error occurred while getting the pending Students"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})