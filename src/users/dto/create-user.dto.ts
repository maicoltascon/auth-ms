export class CreateUserDto {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  username?: string;
  password: string;
  created?: Date;
  modified?: Date;
  dateCreated?: string;
  hourCreated?: string;
  dateModified?: string;
  hourModified?: string;
  idUserModified?: string;
  isActived: boolean;
  isAdmin: boolean;
  isNewUser: boolean;
  company?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  modules?: Module[];
  roles?: Rol[];
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
