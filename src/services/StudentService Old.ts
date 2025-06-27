import type { Student } from '../types/Student';

export class StudentService {
  async fetchStudentData(studentId: string): Promise<Student> {
    return {
      id: studentId,
      name: 'Ali Ahmed',
      classes: [
        { name: 'Math', day: 'Monday', startTime: '09:00', endTime: '10:30' },
        { name: 'Physics', day: 'Monday', startTime: '11:00', endTime: '12:30' },
        { name: 'English', day: 'Tuesday', startTime: '10:00', endTime: '11:30' }
      ],
    };
  }
}
