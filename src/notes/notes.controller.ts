import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  private logger = new Logger('NotesController');

  constructor(private notesService: NotesService) {}

  @Get()
  getNotes(@GetUser() user: User): Promise<Note[]> {
    this.logger.verbose(`User ${user.username} retrieving all Notes`);
    return this.notesService.getNotes(user);
  }

  @Get('/:id')
  getNoteById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Note> {
    this.logger.verbose(`User ${user.username} retrieving Note with ID: ${id}`);
    return this.notesService.getNotesById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User
  ): Promise<Note> {
    this.logger.verbose(
      `User ${user.username} creating Note. Data: ${JSON.stringify(
        createNoteDto
      )}`
    );
    return this.notesService.createNote(createNoteDto, user);
  }

  @Delete('/:id')
  deleteNote(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`User ${user.username} deleting Note with ID: ${id}`);
    return this.notesService.deleteNote(id, user);
  }
}
