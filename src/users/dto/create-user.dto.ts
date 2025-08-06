import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  lastName: string;

  @ApiProperty({ example: '+573001234567', description: 'Número telefónico' })
  phone: string;

  @ApiProperty({ example: 'juan@mail.com', description: 'Correo electrónico' })
  email: string;

  @ApiPropertyOptional({ example: 'juanperez', description: 'Nombre de usuario (opcional)' })
  username?: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña' })
  password: string;

  @ApiPropertyOptional({ example: '2025-08-06T12:00:00Z', description: 'Fecha de creación' })
  created?: Date;

  @ApiPropertyOptional({ example: '2025-08-06T12:30:00Z', description: 'Fecha de última modificación' })
  modified?: Date;

  @ApiPropertyOptional({ example: '06/08/2025', description: 'Fecha legible de creación' })
  dateCreated?: string;

  @ApiPropertyOptional({ example: '12:00:00', description: 'Hora legible de creación' })
  hourCreated?: string;

  @ApiPropertyOptional({ example: '06/08/2025', description: 'Fecha legible de modificación' })
  dateModified?: string;

  @ApiPropertyOptional({ example: '12:30:00', description: 'Hora legible de modificación' })
  hourModified?: string;

  @ApiPropertyOptional({ example: '1234567890abcdef', description: 'ID del usuario que realizó modificaciones' })
  idUserModified?: string;

  @ApiProperty({ example: true, description: 'Indica si el usuario está activo' })
  isActived: boolean;

  @ApiProperty({ example: false, description: 'Indica si el usuario es administrador' })
  isAdmin: boolean;

  @ApiProperty({ example: true, description: 'Indica si es un usuario nuevo' })
  isNewUser: boolean;

  @ApiPropertyOptional({ example: 'EmpresaX', description: 'Nombre de la empresa del usuario' })
  company?: string;

  @ApiPropertyOptional({ example: 'reset-token-abc123', description: 'Token para restablecer contraseña' })
  passwordResetToken?: string;

  @ApiPropertyOptional({ example: '2025-08-07T00:00:00Z', description: 'Fecha de expiración del token de restablecimiento' })
  passwordResetExpires?: Date;

  @ApiPropertyOptional({ type: () => [Module], description: 'Módulos asociados al usuario' })
  modules?: Module[];

  @ApiPropertyOptional({ type: () => [Rol], description: 'Roles asociados al usuario' })
  roles?: Rol[];

  @ApiPropertyOptional({ type: () => [Permission], description: 'Permisos asociados al usuario' })
  permissions?: Permission[];
}


class Module {
  
  name: string;
  description: string;
  created: Date;
  modified: Date;
  isActive: boolean;
  isSystemModule: boolean;
  permissions: Permission[];
  roles: Rol[];
}

class Rol {
  name: string;
  codeRol: string;
  description: string;
  created: Date;
  modiefied: Date;
  isActive: boolean;
  isInheritPermissions: boolean;
}

class Permission {
  name: string;
  description: string;
  action: string;
  resource: string; 
  resourceId?: string; 
  type: string; 
  rol?: Rol; 
  created: Date;
  modified: Date;
  isActive: boolean;
}
