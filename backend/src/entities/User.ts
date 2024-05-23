// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Admin } from './Admin';
import { Teacher } from './Teacher';
import { Student } from './Student';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'teacher', 'student'],
    default: 'student', // Default role is student
  })
  role: string;

  @OneToMany(() => Admin, admin => admin.user)
  admins: Admin[];

  @OneToMany(() => Teacher, teacher => teacher.user)
  teachers: Teacher[];

  @OneToMany(() => Student, student => student.user)
  students: Student[];
}
