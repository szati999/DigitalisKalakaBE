import * as admin from 'firebase-admin';
import {CollectionType} from './register_mentor'

export async function getAllStudents() {
    const snapshot = await admin.firestore().collection(CollectionType.STUDENT).get();

    let students: Array<any> = [];
    for (let doc of snapshot.docs) {
        const data = doc.data();
        students.push(data);
    }
    return students;
}

export async function getPending(type: CollectionType){
    const snapshot = await admin.firestore().collection(type)
        .where('pending','==',true).get();

    let people: Array<any> = [];
    for (let doc of snapshot.docs) {
        const data = doc.data();
        people.push(data);
    }
    return people;
}

export async function getMentorStudents(mentorId: string) {
    const mentorSnap = await admin.firestore().collection(CollectionType.MENTOR).doc(mentorId).get();
    const mentorData = mentorSnap.data();

    let people: Array<any> = [];
    if(mentorData){
        const snapshot = await admin.firestore().collection(CollectionType.STUDENT)
        .where('id', 'in', mentorData.assignedStudents).get();

        for (let doc of snapshot.docs) {
            const data = doc.data();
            people.push(data);
        }
    }
    return people;
}