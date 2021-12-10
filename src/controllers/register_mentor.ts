import * as admin from 'firebase-admin';

export enum CollectionType {
    MENTOR = "mentors",
    STUDENT = "students"
}

export async function register(payload: any, type: CollectionType){
    const docRef = await admin.firestore().collection(type).add({...payload});
    await docRef.update({id: docRef.id});
}