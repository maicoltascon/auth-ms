import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Login } from './dto/auth.dto';
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

    async login(login : Login) {
        const userDB = await this.userModel.findOne({ email: login.email }).exec();

        if (!userDB) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const isPasswordValid = await this.encryptionService.verifyPassword(login.password, userDB.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Creadenciales invalidas');
        }

        if (!userDB.isActived) {
            throw new UnauthorizedException('Usuario no activo, comuniquese con el administrador');
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
        }

        const token = this.getJwtToken(payload);

        return {
            message: 'Login successful',
            statusCode: 200,
            status: 'Success',
            meta: {
                payload,
                totalData: 1,
                token
            }
        }
        
    }


    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    
}
