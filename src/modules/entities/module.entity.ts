import { Schema, model, Document } from 'mongoose';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Rol } from 'src/roles/entities/role.entity';

export interface Module extends Document {
    name: string;
    description: string;
    created: Date;
    modified?: Date;
    dateCreated?: String;
    hourCreated?: String;
    dateModified?: String;
    hourModified?: String;
    idUserModified?: String;
    isActive: boolean;
    isSystemModule: boolean;
    permissions?: Permission[];
    roles?: Rol[];
}

export const ModuleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date },
    dateCreated: { type: String, default: new Date().toISOString().split('T')[0] },
    hourCreated: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
    dateModified: { type: String, default: new Date().toISOString().split('T')[0] },
    hourModified: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
    idUserModified: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
    isSystemModule: { type: Boolean, default: false },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission', default: [], required: false }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Rol', default: [], required: false }],
});

export const ModuleModel = model<Module>('Module', ModuleSchema);

