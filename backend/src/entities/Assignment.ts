// Assignment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './Course';
import { Student } from './Student';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Course, course => course.assignments)
  course: Course;

  @ManyToMany(() => Student, student => student.assignments)
  @JoinTable()
  students: Student[];
}
