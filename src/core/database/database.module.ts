import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/users/entities/user.entity';
import { RolSchema } from 'src/roles/entities/role.entity';
import { PermissionSchema } from 'src/permissions/entities/permission.entity';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'), // Lee la URI desde las variables de entorno
          }),
          inject: [ConfigService],
        }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Rol', schema: RolSchema },
      { name: 'Permission', schema: PermissionSchema },
    ]),
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}