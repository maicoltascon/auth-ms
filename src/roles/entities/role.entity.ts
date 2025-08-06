import { Schema, model, Document } from 'mongoose';


export interface Rol extends Document {
  name: string;
  codeRol: string;
  description: string;
  created: Date;
  modiefied: Date;
  isActive: boolean;
  dateCreated?: String;
  hourCreated?: String;
  dateModified?: String;
  hourModified?: String;
  idUserModified?: string;
  isInheritPermissions: boolean;
}

export const RolSchema = new Schema({
    name: { type: String, unique: true, required: [true, 'The name field is required'] },
    codeRol: { type: String, unique: true, required: [true, 'The code field is required'] },
    description: { type: String, required: [true, 'The description field is required'] },
    created: { type: Date, default: Date.now },
    modified: { type: Date },
    dateCreated: { type: String, default: new Date().toISOString().split('T')[0] },
    hourCreated: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
    dateModified: { type: String, default: new Date().toISOString().split('T')[0] },
    hourModified: { type: String, default: new Date().toISOString().split('T')[1].split('.')[0] },
    idUserModified: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
    isInheritPermissions: { type: Boolean, default: false },
});

export const RolModel = model<Rol>('Rol', RolSchema);
