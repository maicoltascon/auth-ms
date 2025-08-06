import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel('Permission') private readonly permissionModel: Model<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = new this.permissionModel(createPermissionDto);
    const result = await permission.save();

    if (!result) {
      throw new NotFoundException('Permission not created');
    }

    return {
      message: 'Permission created successfully',
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
    const permissions = await this.permissionModel.find().exec();
    if (!permissions) {
      throw new NotFoundException('No permissions found');
    }
    return {
      message: 'Find all permissions',
      statusCode: 200,
      status: 'Success',
      data: permissions,
      meta: {
        totalData: permissions.length,
      },
    };
  }

  async findOne(id: string) {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return {
      message: 'Find one permission',
      statusCode: 200,
      status: 'Success',
      data: permission,
      meta: {
        totalData: 1,
      },
    };
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const updatedPermission = await this.permissionModel.findByIdAndUpdate(id, updatePermissionDto, { new: true }).exec();
    if (!updatedPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return {
      message: 'Permission updated successfully',
      statusCode: 200,
      status: 'Success',
      data: updatedPermission,
      meta: {
        totalData: 1,
        updatedAt: new Date().toISOString(),
        id: updatedPermission._id,
      }
    };
  }

  async remove(id: string) {
    const deletedPermission = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!deletedPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return {
      message: 'Permission deleted successfully',
      statusCode: 200,
      status: 'Success',
      data: deletedPermission,
      meta: {
        totalData: 1,
        deletedAt: new Date().toISOString(),
        id: deletedPermission._id,
      }
    };
  }
}
