import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(96)
  // See: https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must contain at least one upper case letter, one lower case letter and at least one number or special character',
  })
  password: string;
}
