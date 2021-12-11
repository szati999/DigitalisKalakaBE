import * as admin from 'firebase-admin';

export enum CollectionType {
    MENTOR = "mentors",
    STUDENT = "students"
}

export enum DeclineCollectionType {
    DECLINED_MENTORS = "declined_mentors",
    DECLINED_STUDENTS = "declined_students"
}

export async function register(payload: any, type: CollectionType){
    const docRef = await admin.firestore().collection(type).add({...payload});
    await docRef.update({id: docRef.id});
    return docRef.id;
}

export async function accept(id: string, type: CollectionType) {
    await admin.firestore().collection(type).doc(id).update({pending: false});
}