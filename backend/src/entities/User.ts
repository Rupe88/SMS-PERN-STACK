// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Admin } from "./Admin";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { Transform } from "class-transformer";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(4)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: "enum",
    enum: ["admin", "teacher", "student"],
    default: "student",
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  role: string;

  @OneToOne(() => Admin, admin => admin.user, { nullable: true })
  @JoinColumn()
  admin: Admin;

  @OneToOne(() => Teacher, teacher => teacher.user, { nullable: true })
  @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => Student, student => student.user, { nullable: true })
  @JoinColumn()
  student: Student;
}
