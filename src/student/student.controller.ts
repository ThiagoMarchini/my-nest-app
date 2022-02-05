import { StudentService } from './student.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  FindStudentResponseDto,
  StudentResponseDto,
  CreateStudentDto,
  UpdateStudentDto,
} from './dto/student.dto';

// Define the /students route
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): FindStudentResponseDto[] {
    return this.studentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): FindStudentResponseDto {
    return this.studentService.getStudentById(studentId);
  }

  @Post()
  createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
    return this.studentService.createStudent(body);
  }

  @Put('/:studentId')
  updateStudent(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    return this.studentService.updateStudent(body, studentId);
  }

  @Delete('/:studentId')
  deleteStudent(@Param('studentId') studentId: string) {
    this.studentService.deleteStudent(studentId);
  }
}
