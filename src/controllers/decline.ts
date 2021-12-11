import * as admin from 'firebase-admin';
import { CollectionType, DeclineCollectionType } from './register_mentor';

export async function decline(id: string, type: CollectionType, declineType: DeclineCollectionType) {
    const doc = await admin.firestore().collection(type).doc(id).get();
    const data = doc.data();
    if  (data) {
        data.pending = false;
        await admin.firestore().collection(type).doc(id).delete();
        await admin.firestore().collection(declineType).doc(id).set(data);
    }
}