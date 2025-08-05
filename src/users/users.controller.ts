import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoints HTTP REST

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('pagination')
  findByPagination() {
    return this.usersService.findByPagination();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('by-date')
  findByDate() {
    return this.usersService.findAll(); // si quieres filtrar por fecha, se ajustaría aquí
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  // Métodos para microservicio con MessagePattern

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
  msFindById(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'findUsersByDate' })
  msFindByDate() {
    return this.usersService.findAll(); // aquí puedes filtrar por fecha según tu implementación
  }

  @MessagePattern({ cmd: 'updateUser' })
  msUpdate(@Payload() payload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  msRemove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
