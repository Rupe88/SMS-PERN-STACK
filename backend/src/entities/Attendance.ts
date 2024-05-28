// Attendance.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './Student';
import { Course } from './Course';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  status: string; // e.g., "Present", "Absent", "Late", etc.

  @ManyToOne(() => Student, student => student.attendances)
  student: Student;

  @ManyToOne(() => Course, course => course.attendances)
  course: Course;
}
