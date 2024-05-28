// Course.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Assignment } from './Assignment';
import { Class } from './Class';
import { Exam } from './Exam';
import { Attendance } from './Attendance';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Teacher, teacher => teacher.courses)
  teacher: Teacher;

  @ManyToMany(() => Student, student => student.courses)
  students: Student[];

  @OneToMany(() => Assignment, assignment => assignment.course)
  assignments: Assignment[];

  @ManyToMany(() => Class, _class => _class.courses)
  classes: Class[];

  @OneToMany(() => Exam, exam => exam.course)
  exams: Exam[];

  @OneToMany(() => Attendance, attendance => attendance.course)
  attendances: Attendance[];
}
