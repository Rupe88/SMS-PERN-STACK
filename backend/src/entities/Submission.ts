// Submission.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './Student';
import { Exam } from './Exam';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Student, student => student.submissions)
  student: Student;

  @ManyToOne(() => Exam, exam => exam.submissions, { nullable: true })
  exam: Exam;
}
