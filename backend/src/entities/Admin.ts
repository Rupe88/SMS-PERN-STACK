// Admin.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Announcement } from './Announcement';
import { Event } from './Event';
import { Library } from './Library';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.admin)
  user: User;

  @OneToMany(() => Announcement, announcement => announcement.admin)
  announcements: Announcement[];

  @OneToMany(() => Event, event => event.admin)
  events: Event[];

  @OneToMany(() => Library, library => library.admin)
  libraries: Library[];
}
