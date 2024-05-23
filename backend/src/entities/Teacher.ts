// Teacher.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Assignment } from './Assignment';
import { Exam } from './Exam';
import { Class } from './Class';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => User, user => user.teachers)
  user: User;

  @OneToMany(() => Assignment, assignment => assignment.teacher)
  assignments: Assignment[];

  @OneToMany(() => Exam, exam => exam.teacher)
  exams: Exam[];

  @OneToMany(() => Class, cls => cls.teacher)
  classes: Class[];
}
