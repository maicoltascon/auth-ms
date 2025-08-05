import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // Métodos HTTP REST
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }

  // Métodos de microservicio con MessagePattern

  @MessagePattern({ cmd: 'createPermission' })
  msCreate(@Payload() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern({ cmd: 'findAllPermissions' })
  msFindAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePermission' })
  msFindOne(@Payload() id: number) {
    return this.permissionsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updatePermission' })
  msUpdate(@Payload() payload: { id: number; updatePermissionDto: UpdatePermissionDto }) {
    return this.permissionsService.update(payload.id, payload.updatePermissionDto);
  }

  @MessagePattern({ cmd: 'removePermission' })
  msRemove(@Payload() id: number) {
    return this.permissionsService.remove(id);
  }
}
