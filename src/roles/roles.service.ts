import { Injectable,  } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rol } from './entities/role.entity';



@Injectable()
export class RolesService   {



  constructor(@InjectModel('Rol') private readonly rolModel: Model<Rol>) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = new this.rolModel(createRoleDto);
    return {
      message: 'Role created successfully',
      data: await newRole.save(),
    };
  }

  async findAll() {
    const roles = await this.rolModel.find();
    return {
      message: 'Roles retrieved successfully',
      data: roles,
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updateRol = await this.rolModel.findByIdAndUpdate(id, updateRoleDto, { new: true })
    return {
      message: 'Role updated successfully',
      data: updateRol
    };
  }

  async remove(id: number) {
    const deletedRol = await this.rolModel.findByIdAndDelete(id)
    return {
      message: 'Role deleted successfully',
      data: deletedRol
    }
  }

  

}
