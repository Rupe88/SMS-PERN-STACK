// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  @Column({ nullable: true }) // Allow null to indicate no avatar uploaded
  avatar: string;

  @Column({
    type: "enum",
    enum: ["admin", "teacher", "student"],
    default: "student", // Default role is student
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  role: string;

  @OneToMany(() => Admin, (admin) => admin.user)
  admins: Admin[];

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];
}
