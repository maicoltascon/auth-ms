import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // Métodos HTTP REST

  @Post()
  @ApiOperation({ summary: 'Crear un permiso nuevo' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({
    status: 201,
    description: 'Permiso creado exitosamente',
    schema: {
      example: {
        message: 'Permission created successfully',
        statusCode: 201,
        status: 'Success',
        data: {/* objeto permiso creado */},
        meta: {
          totalData: 1,
          createdAt: '2025-08-06T12:00:00.000Z',
          updatedAt: '2025-08-06T12:00:00.000Z',
          id: 'id-permiso'
        }
      }
    }
  })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  @ApiResponse({
    status: 200,
    description: 'Listado de todos los permisos',
    schema: {
      example: {
        message: 'find all permissions',
        statusCode: 200,
        status: 'Success',
        data: [/* array de permisos */],
        meta: { totalData: 5 }
      }
    }
  })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un permiso por ID' })
  @ApiParam({ name: 'id', description: 'ID del permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso encontrado',
    schema: {
      example: {
        message: 'find one permission',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto permiso */},
        meta: { totalData: 1 }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Permiso no encontrado'
  })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un permiso por ID' })
  @ApiParam({ name: 'id', description: 'ID del permiso a actualizar' })
  @ApiBody({ type: UpdatePermissionDto })
  @ApiResponse({
    status: 200,
    description: 'Permiso actualizado exitosamente',
    schema: {
      example: {
        message: 'Permission updated successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto permiso actualizado */},
        meta: {
          totalData: 1,
          updatedAt: '2025-08-06T12:30:00.000Z',
          id: 'id-permiso'
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Permiso no encontrado'
  })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un permiso por ID' })
  @ApiParam({ name: 'id', description: 'ID del permiso a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Permiso eliminado exitosamente',
    schema: {
      example: {
        message: 'Permission deleted successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto permiso eliminado */},
        meta: {
          totalData: 1,
          deletedAt: '2025-08-06T13:00:00.000Z',
          id: 'id-permiso'
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Permiso no encontrado'
  })
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }

  // Métodos de microservicio con MessagePattern - no documentados por Swagger

  @MessagePattern({ cmd: 'createPermission' })
  msCreate(@Payload() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern({ cmd: 'findAllPermissions' })
  msFindAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern({ cmd: 'findOnePermission' })
  msFindOne(@Payload() id: string) {
    return this.permissionsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updatePermission' })
  msUpdate(@Payload() payload: { id: string; updatePermissionDto: UpdatePermissionDto }) {
    return this.permissionsService.update(payload.id, payload.updatePermissionDto);
  }

  @MessagePattern({ cmd: 'removePermission' })
  msRemove(@Payload() id: string) {
    return this.permissionsService.remove(id);
  }
}
