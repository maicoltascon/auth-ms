import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Rol } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

import { PERMISSIONS } from 'src/set-data-init/helpers/permissions.admin';
import { ROLES } from 'src/set-data-init/helpers/role.admin';
import { ADMIN_USER } from './helpers/user.admin';

@Injectable()
export class SetDataInit implements OnApplicationBootstrap {
  private readonly logger = new Logger(SetDataInit.name);

  constructor(
    @InjectModel('Rol') private readonly rolModel: Model<Rol>,
    @InjectModel('Permission')
    private readonly permissionsModel: Model<Permission>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createInitRoles() {
    try {
      await this.rolModel.insertMany(ROLES, { ordered: false });
      this.logger.log('Roles initialized successfully');
    } catch (error) {
      if (error.code === 11000) {
        this.logger.warn('Some roles already exist, skipping duplicates');
      } else {
        throw error;
      }
    }
  }

  async createInitPermissions() {
    try {
      await this.permissionsModel.insertMany(PERMISSIONS, { ordered: false });
      this.logger.log('Permissions initialized successfully');
    } catch (error) {
      if (error.code === 11000) {
        this.logger.warn('Some permissions already exist, skipping duplicates');
      } else {
        throw error;
      }
    }
  }

  async createAdminUser() {
    try {
      const permissions = await this.permissionsModel.find().exec();
      const roles = await this.rolModel.find().exec();

      const admin = new this.userModel({
        ...ADMIN_USER,
        roles: roles.map((role) => role._id), // Extraer solo los ObjectId
        permissions: permissions.map((permission) => permission._id), // Extraer solo los ObjectId
      });

      await admin.save();
      this.logger.log('Admin user created successfully.');

    } catch (error) {
      this.logger.error('Error creating admin user', error);
    }
  }

  async onApplicationBootstrap() {
    await this.validateIfDataExists();
  }

  async validateIfDataExists() {
    try {
      const rolCount = await this.rolModel.countDocuments().exec();
      const permissionsCount = await this.permissionsModel
        .countDocuments()
        .exec();
      const userCount = await this.userModel.countDocuments().exec();
      if (rolCount === 0) {
        this.logger.warn('No roles found, creating an data admin...');
        await this.createInitRoles();
      }

      if (permissionsCount === 0) {
        this.logger.warn('No permissions found, creating an data admin...');
        await this.createInitPermissions();
      }

      if (userCount === 0) {
        this.logger.warn('No users found, creating an admin user...');
        await this.createAdminUser();
      }
    } catch (error) {
      this.logger.error('Error validating if data exists', error);
    }
  }
}
