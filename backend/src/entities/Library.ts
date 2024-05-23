// src/entities/Library.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './Admin';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ type: 'date' })
  publicationDate: Date;

  @Column()
  numberOfCopies: number;

  @ManyToOne(() => Admin, admin => admin.libraries)
  admin: Admin;

  // Add other library-specific fields as needed
}
