import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  // Endpoints HTTP REST

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id);
  }

  // Endpoints para microservicio con MessagePattern

  @MessagePattern({ cmd: 'createModule' })
  msCreate(@Payload() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @MessagePattern({ cmd: 'findAllModules' })
  msFindAll() {
    return this.modulesService.findAll();
  }

  @MessagePattern({ cmd: 'findOneModule' })
  msFindOne(@Payload() id: number) {
    return this.modulesService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateModule' })
  msUpdate(@Payload() payload: { id: number; updateModuleDto: UpdateModuleDto }) {
    return this.modulesService.update(payload.id, payload.updateModuleDto);
  }

  @MessagePattern({ cmd: 'removeModule' })
  msRemove(@Payload() id: number) {
    return this.modulesService.remove(id);
  }
}
