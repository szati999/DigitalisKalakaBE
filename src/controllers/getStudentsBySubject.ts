import * as admin from 'firebase-admin';
import {CollectionType} from './register_mentor'

export async function getBySubject(subject: string, type: CollectionType) {
    const snapshot = await admin.firestore().collection(type)
        .where("subject", "==", subject).get();

    let students: Array<any> = [];
    for (let doc of snapshot.docs) {
        const data = doc.data();
        students.push(data);
    }
    return students;
}