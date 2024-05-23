// Assignment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Teacher } from './Teacher';
import { Class } from './Class';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Teacher, teacher => teacher.assignments)
  teacher: Teacher;

  @ManyToOne(() => Class, cls => cls.assignments)
  class: Class;
}
