import * as admin from 'firebase-admin';

export async function assignStudent(payload: any) {
    await admin.firestore()
    .collection('proprietary')
    .doc(payload.mentorId)
    .set(
      { assignedStudents: [payload.studentId] },
      { merge: true }
    )
}