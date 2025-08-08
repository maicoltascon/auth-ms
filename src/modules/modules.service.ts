import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from './entities/module.entity';


@Injectable()
export class ModulesService {
  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<Module>,
  ) {
    // Initialization logic if needed
  }
  async create(createModuleDto: CreateModuleDto) {
    const module = new this.moduleModel(createModuleDto);
    const result = await module.save();
    console.log('Created Module:', result);

    if (!result) {
      throw new NotFoundException('Module not created');
    }

    return {
      message: 'Module created successfully',
      statusCode: 201,
      status: 'Success',
      data: result,
      meta: {
        totalData: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: result._id,
      }
    };
  }

  async findAll() {    
    const modules = await this.moduleModel.find().exec();    
    if (!modules) {
      throw new NotFoundException('No modules found');
    }

    return {
      message: 'find all modules',
      statusCode: 200,
      status: 'Success',
      data: modules,
      meta: {
        totalData: modules.length,
      },
    };
  }

  async findOne(id: string) {
    console.log(`Finding module with ID: ${id}`);
    
    const module = await this.moduleModel.findById(id).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    return {
      message: 'find one module',
      statusCode: 200,
      status: 'Success',
      data: module,
      meta: {
        totalData: 1,
      },
    };
  }

   async update(id: string, updateModuleDto: UpdateModuleDto) {
    const updatedModule = await this.moduleModel.findByIdAndUpdate(id, updateModuleDto, { new: true }).exec();
    if (!updatedModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    console.log('Updated Module:', updatedModule);
    return {
      message: 'Module updated successfully',
      statusCode: 200,
      status: 'Success',
      data: updatedModule,
      meta: {
        totalData: 1,
        updatedAt: new Date().toISOString(),
        id: updatedModule._id,
      }
    };
  }

  async remove(id: string) {
    const deletedModule = await this.moduleModel.findByIdAndDelete(id).exec();
    if (!deletedModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    console.log('Deleted Module:', deletedModule);
    return {
      message: 'Module deleted successfully',
      statusCode: 200,
      status: 'Success',
      data: deletedModule,
      meta: {
        totalData: 1,
        deletedAt: new Date().toISOString(),
        id: deletedModule._id,
      }
    };
  }
}
