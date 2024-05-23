// Exam.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from './Teacher';
import { Class } from './Class';
import { Submission } from './Submission';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @ManyToOne(() => Teacher, teacher => teacher.exams)
  teacher: Teacher;

  @ManyToOne(() => Class, cls => cls.exams)
  class: Class;

  @Column({ nullable: true })
  maxScore: number; // Maximum score for the exam

  @OneToMany(() => Submission, submission => submission.exam)
  submissions: Submission[];
}
