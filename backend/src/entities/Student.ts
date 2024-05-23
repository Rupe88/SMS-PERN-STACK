// Student.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Attendance } from './Attendance';
import { Submission } from './Submission';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => User, user => user.students)
  user: User;

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Submission, submission => submission.student)
  submissions: Submission[];

  // Add other student-specific fields as needed
}
