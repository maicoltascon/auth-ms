import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { StrategyGlobalModule } from 'src/core/modules/strategyModule.module';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
