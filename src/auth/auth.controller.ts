import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Login } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    schema: {
      example: {
        message: 'Login successful',
        statusCode: 200,
        status: 'Success',
        meta: {
          payload: {
            _id: 'id-usuario',
            name: 'Juan',
            lastName: 'Pérez',
            email: 'juan@mail.com',
            username: 'juanp',
            date_joined: '2025-08-06T12:00:00Z',
            isActived: true,
            isAdmin: false,
            company: 'EmpresaX',
            modules: ['mod1', 'mod2'],
            roles: ['Admin', 'Editor'],
            permissions: ['create', 'read', 'update']
          },
          totalData: 1,
          token: 'jwt.token.aqui'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBody({ type: Login })
  login(@Body() login: Login) {
    return this.authService.login(login);
  }

  // Endpoint de microservicio (no documentado por Swagger)
  @MessagePattern({ cmd: 'login' })
  msLogin(@Payload() login: Login) {
    return this.authService.login(login);
  }

  
}
