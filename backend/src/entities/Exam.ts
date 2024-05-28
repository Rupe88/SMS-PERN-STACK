// Exam.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './Course';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  maxMarks: number;

  @ManyToOne(() => Course, course => course.exams)
  course: Course;

  @ManyToMany(() => Student, student => student.exams)
  @JoinTable()
  students: Student[];

  @ManyToOne(() => Teacher, teacher => teacher.exams)
  teacher: Teacher;
}
