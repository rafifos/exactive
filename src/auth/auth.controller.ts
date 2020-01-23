import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import * as omit from 'lodash.omit';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    this.logger.verbose(
      `Creating a new User with params: ${JSON.stringify(
        omit(authCredentialsDto, 'password')
      )}`
    );
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `Signing-in User: ${JSON.stringify(omit(authCredentialsDto, 'password'))}`
    );
    return this.authService.signIn(authCredentialsDto);
  }
}
