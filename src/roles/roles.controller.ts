import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Endpoints HTTP REST
@Post()
  @ApiOperation({ summary: 'Crear un rol' })
  @ApiResponse({
    status: 201,
    description: 'Rol creado con éxito',
    schema: {
      example: {
        message: 'Role created successfully',
        statusCode: 201,
        status: 'Success',
        data: { /* objeto rol creado */ },
        meta: {
          totalData: 1,
          createdAt: '2025-08-06T12:00:00.000Z',
          updatedAt: '2025-08-06T12:00:00.000Z',
          id: 'id-del-rol'
        }
      }
    }
  })
  @ApiBody({ type: CreateRoleDto })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({
    status: 200,
    description: 'Listado de roles recuperados',
    schema: {
      example: {
        message: 'Roles retrieved successfully',
        statusCode: 200,
        status: 'Success',
        data: [ /* array de roles */ ],
        meta: { totalData: 5 }
      }
    }
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol' })
  @ApiResponse({
    status: 200,
    description: 'Rol recuperado con éxito',
    schema: {
      example: {
        message: 'Role retrieved successfully',
        statusCode: 200,
        status: 'Success',
        data: { /* objeto rol */ },
        meta: { totalData: 1 }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol a actualizar' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado con éxito',
    schema: {
      example: {
        message: 'Role updated successfully',
        statusCode: 200,
        status: 'Success',
        data: { /* objeto rol actualizado */ },
        meta: {
          totalData: 1,
          updatedAt: '2025-08-06T12:30:00.000Z',
          id: 'id-del-rol'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Rol eliminado con éxito',
    schema: {
      example: {
        message: 'Role deleted successfully',
        statusCode: 200,
        status: 'Success',
        data: { /* objeto rol eliminado */ },
        meta: {
          totalData: 1,
          deletedAt: '2025-08-06T13:00:00.000Z',
          id: 'id-del-rol'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
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
  msFindOne(@Payload() id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateRole' })
  msUpdate(@Payload() payload: { id: string; updateRoleDto: UpdateRoleDto }) {
    return this.rolesService.update(payload.id, payload.updateRoleDto);
  }

  @MessagePattern({ cmd: 'removeRole' })
  msRemove(@Payload() id: string) {
    return this.rolesService.remove(id);
  }
}
