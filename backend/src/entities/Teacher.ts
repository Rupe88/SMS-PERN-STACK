// Teacher.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Course } from './Course';
import { Class } from './Class';
import { Exam } from './Exam';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.teacher)
  user: User;

  @OneToMany(() => Course, course => course.teacher)
  courses: Course[];

  @OneToMany(() => Class, _class => _class.teacher)
  classes: Class[];

  @OneToMany(() => Exam, exam => exam.teacher)
  exams: Exam[];
}
