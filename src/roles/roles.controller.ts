import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Endpoints HTTP REST
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  // Métodos para microservicio con MessagePattern

  @MessagePattern({ cmd: 'createRole' })
  msCreate(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern({ cmd: 'findAllRoles' })
  msFindAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneRole' })
  msFindOne(@Payload() id: number) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateRole' })
  msUpdate(@Payload() payload: { id: number; updateRoleDto: UpdateRoleDto }) {
    return this.rolesService.update(payload.id, payload.updateRoleDto);
  }

  @MessagePattern({ cmd: 'removeRole' })
  msRemove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
