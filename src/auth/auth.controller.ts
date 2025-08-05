import { Body, Controller, Post, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Login } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint HTTP
  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }

  // Endpoint de microservicio
  @MessagePattern({ cmd: 'login' })
  msLogin(@Payload() login: Login) {
    return this.authService.login(login);
  }
}
