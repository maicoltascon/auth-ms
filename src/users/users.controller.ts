import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un usuario nuevo' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    schema: {
      example: {
        message: 'User created successfully',
        statusCode: 201,
        status: 'Success',
        data: {/* objeto usuario creado */},
        meta: {
          totalData: 1,
          createdAt: '2025-08-06T12:00:00.000Z',
          id: 'id-usuario'
        }
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Listado de usuarios',
    schema: {
      example: {
        message: 'Users retrieved successfully',
        statusCode: 200,
        status: 'Success',
        data: [/* array de usuarios */],
        meta: { totalData: 10 }
      }
    }
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Obtener usuarios paginados' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Usuarios por página' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios paginados',
    schema: {
      example: {
        message: 'Paginated users retrieved successfully',
        statusCode: 200,
        status: 'Success',
        data: [/* array de usuarios paginados */],
        meta: {
          totalData: 50,
          page: 1,
          limit: 10
        }
      }
    }
  })
  findByPagination(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.usersService.findByPagination(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    schema: {
      example: {
        message: 'User retrieved successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto usuario */},
        meta: { totalData: 1 }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('by-date')
  @ApiOperation({ summary: 'Obtener usuarios filtrados por rango de fecha' })
  @ApiQuery({ name: 'startDate', required: true, type: String, description: 'Fecha inicial (ISO 8601)' })
  @ApiQuery({ name: 'endDate', required: true, type: String, description: 'Fecha final (ISO 8601)' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios filtrados por fecha',
    schema: {
      example: {
        message: 'Users retrieved by date range successfully',
        statusCode: 200,
        status: 'Success',
        data: [/* array de usuarios filtrados */],
        meta: {
          totalData: 5,
          startDate: '2025-08-01T00:00:00.000Z',
          endDate: '2025-08-31T23:59:59.999Z'
        }
      }
    }
  })
  findByDate(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.usersService.findByDate(startDate, endDate);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    schema: {
      example: {
        message: 'User updated successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto usuario actualizado */},
        meta: {
          totalData: 1,
          updatedAt: '2025-08-06T13:00:00.000Z',
          id: 'id-usuario'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: {
        message: 'User deleted successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto usuario eliminado */},
        meta: {
          totalData: 1,
          deletedAt: '2025-08-06T14:00:00.000Z',
          id: 'id-usuario'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Métodos para microservicio con MessagePattern (no documentados en Swagger)

  @MessagePattern({ cmd: 'createUser' })
  msCreate(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  msFindAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findUsersByPagination' })
  msFindByPagination() {
    return this.usersService.findByPagination();
  }

  @MessagePattern({ cmd: 'findUserById' })
  msFindById(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'findUsersByDate' })
  msFindByDate() {
    return this.usersService.findAll(); // Ajustar si implementas filtro en microservicio
  }

  @MessagePattern({ cmd: 'updateUser' })
  msUpdate(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  msRemove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
