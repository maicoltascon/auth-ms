import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Login, ChangePassword } from './dto/auth.dto';
import { EncryptionService } from 'src/core/services/encryption.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/core/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async login(login: Login) {
    const userDB = await this.userModel.findOne({ email: login.email }).exec();

    if (!userDB) {
      throw new ForbiddenException('Usuario no encontrado');
    }

    const isPasswordValid = await this.encryptionService.verifyPassword(
      login.password,
      userDB.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Creadenciales invalidas');
    }

    if (!userDB.isActived) {
      throw new ForbiddenException(
        'Usuario no activo, comuniquese con el administrador',
      );
    }

    const payload = {
      _id: userDB._id,
      name: userDB.name,
      lastName: userDB.lastName,
      email: userDB.email,
      username: userDB.username,
      date_joined: userDB.created,
      isActived: userDB.isActived,
      isAdmin: userDB.isAdmin,
      company: userDB.company,
      modules: userDB.modules,
      roles: userDB.roles,
      permissions: userDB.permissions,
    };

    const token = this.getJwtToken(payload);

    return {
      message: 'Login successful',
      statusCode: 200,
      status: 'Success',
      meta: {
        payload,
        totalData: 1,
        token,
      },
    };
  }

  async changePassword(changePassword: ChangePassword) {
    try {
      const userDB = await this.userModel
        .findOne({ _id: changePassword.id })
        .exec();

      if (!userDB) {
        return {
          message: 'Usuario no encontrado',
          statusCode: 404,
          status: 'Error',
          meta: {
            totalData: 0,
          },
        };
      }

      const isPasswordValid = await this.encryptionService.verifyPassword(
        changePassword.currentPassword,
        userDB.password,
      );

      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return {
          message: 'La contraseña actual es incorrecta',
          statusCode: 400,
          status: 'Error',
          meta: {
            totalData: 0,
          },
        };
      }
      const hashedPassword = await this.encryptionService.hashPassword(
        changePassword.newPassword,
      );
      const result = await this.userModel
        .findOneAndUpdate(
          { _id: changePassword.id },
          { password: hashedPassword },
          {
            new: true,
          },
        )
        .exec();

      return {
        message: 'Contraseña cambiada correctamente',
        statusCode: 201,
        status: 'Success',
        data: result?.name + ' ' + result?.lastName,
        meta: {
          totalData: 1,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
