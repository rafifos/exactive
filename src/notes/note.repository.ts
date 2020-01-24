import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  private logger = new Logger('NoteRepository');

  async getNotes(user: User): Promise<Note[]> {
    const query = this.createQueryBuilder('note');

    query.where('note.userId = :userId', { userId: user.id });

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get Notes for User ${user.username}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const { content } = createNoteDto;

    const note = new Note();
    note.content = content;
    note.user = user;

    try {
      await note.save();
    } catch (error) {
      this.logger.error(
        `Failed to create Note for User ${
          user.username
        }. Data: ${JSON.stringify(createNoteDto)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }

    // Make sure we don't return the user entity.
    this.logger.debug('Removing User Entity from Note');
    delete note.user;

    return note;
  }
}
