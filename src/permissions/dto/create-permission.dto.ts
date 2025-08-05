import { CreateRoleDto } from "src/roles/dto/create-role.dto";

export class CreatePermissionDto {
  name: string;
  description: string;
  action: string; // `create`, `read`, `update`, `delete`, etc.
  resource?: string; // `usuarios`, `posts`, `comentarios`, etc.
  resourceId?: string; // Opcional, si aplica al recurso específico
  type: string; // `global` o `role-based`
  rol?: CreateRoleDto; // Relación con el Rol
  created: Date;
  modified: Date;
  dateCreated: String;
  hourCreated: String;
  dateModified: String;
  hourModified: String;
  idUserModified: String;
  isActive: boolean;
}


