import { Schema, model, Document } from 'mongoose';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Rol } from 'src/roles/entities/role.entity';

export interface Module extends Document {
    name: string;
    description: string;
    created: Date;
    modified: Date;
    isActive: boolean;
    isSystemModule: boolean;
    permissions: Permission[];
    roles: Rol[];
}

const ModuleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date },
    isActive: { type: Boolean, default: true },
    isSystemModule: { type: Boolean, default: false },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Rol' }],
});

export const ModuleModel = model<Module>('modules', ModuleSchema);

