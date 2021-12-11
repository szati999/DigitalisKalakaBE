import * as admin from 'firebase-admin';

export async function assignStudent(payload: any) {
    await admin.firestore()
    .collection('mentors')
    .doc(payload.mentorId)
    .update({
      assignedStudents: admin.firestore.FieldValue.arrayUnion(payload.studentId)
    });
}