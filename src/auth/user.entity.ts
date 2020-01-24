import * as bcrypt from 'bcrypt';
import { Note } from 'src/notes/note.entity';
import { Task } from 'src/tasks/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true }
  )
  tasks: Task[];

  @OneToMany(
    type => Note,
    note => note.user,
    { eager: true }
  )
  notes: Note[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
