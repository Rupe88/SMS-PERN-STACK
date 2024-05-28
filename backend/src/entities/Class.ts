// Class.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Course } from './Course';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher, teacher => teacher.classes)
  teacher: Teacher;

  @ManyToMany(() => Student, student => student.classes)
  @JoinTable()
  students: Student[];

  @ManyToMany(() => Course, course => course.classes)
  @JoinTable()
  courses: Course[];
}
