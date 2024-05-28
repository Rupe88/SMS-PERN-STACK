// Library.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from './Admin';
import { Book } from './Book';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToOne(() => Admin, admin => admin.libraries)
  admin: Admin;

  @OneToMany(() => Book, book => book.library)
  books: Book[];
}
