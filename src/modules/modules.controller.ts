import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un módulo nuevo' })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({
    status: 201,
    description: 'Módulo creado exitosamente',
    schema: {
      example: {
        message: 'Module created successfully',
        statusCode: 201,
        status: 'Success',
        data: {/* objeto module creado */},
        meta: {
          totalData: 1,
          createdAt: '2025-08-06T12:00:00.000Z',
          updatedAt: '2025-08-06T12:00:00.000Z',
          id: 'id-modulo'
        }
      }
    }
  })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los módulos' })
  @ApiResponse({
    status: 200,
    description: 'Listado de todos los módulos',
    schema: {
      example: {
        message: 'find all modules',
        statusCode: 200,
        status: 'Success',
        data: [/* array de módulos */],
        meta: { totalData: 3 }
      }
    }
  })
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un módulo por ID' })
  @ApiParam({ name: 'id', description: 'ID del módulo' })
  @ApiResponse({
    status: 200,
    description: 'Módulo encontrado',
    schema: {
      example: {
        message: 'find one module',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto módulo */},
        meta: { totalData: 1 }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Módulo no encontrado'
  })
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un módulo por ID' })
  @ApiParam({ name: 'id', description: 'ID del módulo a actualizar' })
  @ApiBody({ type: UpdateModuleDto })
  @ApiResponse({
    status: 200,
    description: 'Módulo actualizado exitosamente',
    schema: {
      example: {
        message: 'Module updated successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto módulo actualizado */},
        meta: {
          totalData: 1,
          updatedAt: '2025-08-06T12:30:00.000Z',
          id: 'id-modulo'
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Módulo no encontrado'
  })
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un módulo por ID' })
  @ApiParam({ name: 'id', description: 'ID del módulo a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Módulo eliminado exitosamente',
    schema: {
      example: {
        message: 'Module deleted successfully',
        statusCode: 200,
        status: 'Success',
        data: {/* objeto módulo eliminado */},
        meta: {
          totalData: 1,
          deletedAt: '2025-08-06T13:00:00.000Z',
          id: 'id-modulo'
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Módulo no encontrado'
  })
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }

  // Métodos microservicio no documentados por Swagger

  @MessagePattern({ cmd: 'createModule' })
  msCreate(@Payload() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @MessagePattern({ cmd: 'findAllModules' })
  msFindAll() {
    return this.modulesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneModule' })
  msFindOne(@Payload() id: string) {
    return this.modulesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateModule' })
  msUpdate(@Payload() payload: { id: string; updateModuleDto: UpdateModuleDto }) {
    return this.modulesService.update(payload.id, payload.updateModuleDto);
  }

  @MessagePattern({ cmd: 'removeModule' })
  msRemove(@Payload() id: string) {
    return this.modulesService.remove(id);
  }
}
