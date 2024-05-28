// Student.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Course } from './Course';
import { Assignment } from './Assignment';
import { Class } from './Class';
import { Exam } from './Exam';
import { Attendance } from './Attendance';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.student)
  user: User;

  @ManyToMany(() => Course, course => course.students)
  @JoinTable()
  courses: Course[];

  @ManyToMany(() => Assignment, assignment => assignment.students)
  assignments: Assignment[];

  @ManyToMany(() => Class, _class => _class.students)
  classes: Class[];

  @ManyToMany(() => Exam, exam => exam.students)
  exams: Exam[];

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];
}
