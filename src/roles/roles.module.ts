import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from './entities/role.entity';
import { StrategyGlobalModule } from 'src/core/modules/strategyModule.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Rol', schema: RolSchema }]),
  ],
})
export class RolesModule {}
