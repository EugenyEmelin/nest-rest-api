import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @Post('/registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user);
  }
}
