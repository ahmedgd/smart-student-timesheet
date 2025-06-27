import type { Student } from '../types/Student';

export class StudentService {
  async fetchStudentData(studentId: string): Promise<Student> {
    const res = await fetch(
      'https://dd6d1191-1fa4-403e-b033-ae6345edb566.mock.pstmn.io/getStudentClasses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'sessionID': '12345'
        },
        body: JSON.stringify({ studentId })
      }
    );
    return res.json();
  }
}
