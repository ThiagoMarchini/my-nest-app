import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { students } from '../db';
import {
  CreateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;
  getStudents(): FindStudentResponseDto[] {
    return this.students;
  }

  getStudentById(studentId: string): FindStudentResponseDto {
    return this.students.find((s) => s.id === studentId);
  }

  getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
    const result = this.students.filter((s) => s.teacher === teacherId);
    if (result) return result;
    else return null;
  }

  createStudent(payload: CreateStudentDto): StudentResponseDto {
    const newStudent = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(
    payload: UpdateStudentDto,
    studentId: string,
  ): StudentResponseDto {
    const studentIndex = this.students.findIndex(
      (student) => student.id === studentId,
    );
    const updatedStudent = {
      id: studentId,
      ...payload,
    };
    this.students[studentIndex] = updatedStudent;
    return updatedStudent;
  }

  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): StudentResponseDto {
    let updatedStudent: StudentResponseDto;
    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          ...student,
          teacher: teacherId,
        };
      } else {
        return student;
      }
    });

    this.students = updatedStudentList;
    return updatedStudent;
  }

  deleteStudent(studentId: string) {
    const newStudentsList = this.students.filter(
      (student) => student.id !== studentId,
    );
    this.students = newStudentsList;
  }
}
