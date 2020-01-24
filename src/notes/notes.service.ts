import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NotesService {
  private logger = new Logger('NotesService');

  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository
  ) {}

  async getNotes(user: User): Promise<Note[]> {
    return this.noteRepository.getNotes(user);
  }

  async getNotesById(id: number, user: User): Promise<Note> {
    const found = await this.noteRepository.findOne({ id, userId: user.id });

    if (!found) {
      this.logger.error(
        `User ${user.username} tried to retrieve a Note with ID: ${id}, but no Note matching the criteria exists on the server`
      );
      throw new NotFoundException(
        `Note with ID '${id}' doesn't exist on the server.`
      );
    }

    return found;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    return this.noteRepository.createNote(createNoteDto, user);
  }

  async deleteNote(id: number, user: User): Promise<void> {
    const result = await this.noteRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      this.logger.error(
        `User ${user.username} tried to delete a Note with ID: ${id}, but no Note matching the criteria exists on the server`
      );
      throw new NotFoundException(
        `Note with ID '${id}' doesn't exist on the server.`
      );
    }
  }
}
