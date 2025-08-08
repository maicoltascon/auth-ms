import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptionService } from 'src/core/services/encryption.service';
import { JwtTCPStrategy } from 'src/core/strategies/jwtTCP.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EncryptionService, JwtTCPStrategy],
  exports: [AuthService],
})
export class AuthModule {}
