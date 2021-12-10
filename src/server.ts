import express from 'express'
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
const serviceAccount = require("../serviceAccountKeys.json");
const app = express()
const PORT = 3000

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://digitalis-kalaka.firebaseio.com'
});
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
    admin.firestore().collection("mivan").add({message: "faszagyerek"});
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})