// Class.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from './Teacher';
import { Assignment } from './Assignment';
import { Exam } from './Exam';
import { Attendance } from './Attendance';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @ManyToOne(() => Teacher, teacher => teacher.classes)
  teacher: Teacher;

  @OneToMany(() => Assignment, assignment => assignment.class)
  assignments: Assignment[];

  @OneToMany(() => Exam, exam => exam.class)
  exams: Exam[];

  @OneToMany(() => Attendance, attendance => attendance.class)
  attendances: Attendance[];
}
