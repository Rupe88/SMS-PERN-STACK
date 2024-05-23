// Admin.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Announcement } from './Announcement';
import { Event } from './Event';
import { Library } from './Library';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => User, user => user.admins)
  user: User;

  @OneToMany(() => Announcement, announcement => announcement.admin)
  announcements: Announcement[];

  @ManyToOne(()=>Event, event=>event.admin)
  events:Event[];

  @OneToMany(() => Library, library => library.admin)
  libraries: Library[];

  
}
