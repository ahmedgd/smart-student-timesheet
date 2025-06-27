import { StudentService } from '../services/StudentService';
import type { Class } from '../types/Class';

export class StudentFacade {
  private service = new StudentService();

  async getStudentClasses(studentId: string): Promise<Class[]> {
    const student = await this.service.fetchStudentData(studentId);
    return student.classes;
  }
}
