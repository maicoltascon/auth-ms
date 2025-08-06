import { Schema, model, Document } from 'mongoose';
import { Rol } from 'src/roles/entities/role.entity';

export interface Permission extends Document {
  name: string;
  description: string;
  action: string; // `create`, `read`, `update`, `delete`, etc.
  resource: string; // `usuarios`, `posts`, `comentarios`, etc.
  resourceId?: string; // Opcional, si aplica al recurso específico
  type: string; // `global` o `role-based`
  rol?: Rol; // Relación con el Rol
  created: Date;
  modified: Date;
  dateCreated?: String;
  hourCreated?: String;
  dateModified?: String;
  hourModified?: String;
  idUserModified?: String;
  isActive: boolean;
}

export const PermissionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  type: { type: String, required: true },
  rol: { type: Schema.Types.ObjectId, ref: 'Rol' },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  dateCreated: { type: String, default: new Date().toISOString().split('T')[0] },
  hourCreated: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
  dateModified: { type: String, default: new Date().toISOString().split('T')[0] },
  hourModified: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
  idUserModified: { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
});

export const PermissionModel = model<Permission>('permissions', PermissionSchema);
