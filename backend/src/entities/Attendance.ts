// Attendance.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from './Class';
import { Student } from './Student';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Class, cls => cls.attendances)
  class: Class;

  @ManyToOne(() => Student, student => student.attendances)
  student: Student;

  @Column({ default: true })
  isPresent: boolean;
}
