import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rol } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(@InjectModel('Rol') private readonly rolModel: Model<Rol>) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = new this.rolModel(createRoleDto);
    const result = await newRole.save();

    if (!result) {
      throw new NotFoundException('Role not created');
    }

    return {
      message: 'Role created successfully',
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
    const roles = await this.rolModel.find().exec();
    if (!roles) {
      throw new NotFoundException('No roles found');
    }
    return {
      message: 'Roles retrieved successfully',
      statusCode: 200,
      status: 'Success',
      data: roles,
      meta: {
        totalData: roles.length,
      },
    };
  }

  async findOne(id: string) {
    const role = await this.rolModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return {
      message: 'Role retrieved successfully',
      statusCode: 200,
      status: 'Success',
      data: role,
      meta: {
        totalData: 1,
      },
    };
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.rolModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
    if (!updatedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return {
      message: 'Role updated successfully',
      statusCode: 200,
      status: 'Success',
      data: updatedRole,
      meta: {
        totalData: 1,
        updatedAt: new Date().toISOString(),
        id: updatedRole._id,
      }
    };
  }

  async remove(id: string) {
    const deletedRole = await this.rolModel.findByIdAndDelete(id).exec();
    if (!deletedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return {
      message: 'Role deleted successfully',
      statusCode: 200,
      status: 'Success',
      data: deletedRole,
      meta: {
        totalData: 1,
        deletedAt: new Date().toISOString(),
        id: deletedRole._id,
      }
    };
  }

}
