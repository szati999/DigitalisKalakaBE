import * as admin from 'firebase-admin';

export async function assignStudent(payload: any) {
    await admin.firestore()
    .collection('mentors')
    .doc(payload.mentorId)
    .update({
      assignedStudents: admin.firestore.FieldValue.arrayUnion(payload.studentId)
    });

    const doc = await admin.firestore()
    .collection('mentors')
    .doc(payload.mentorId).get();

    const data = doc.data();
    return data!.assignedStudents;
}