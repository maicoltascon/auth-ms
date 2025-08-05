import { Schema, model, Document } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { Permission } from 'src/permissions/entities/permission.entity';
import { Rol } from 'src/roles/entities/role.entity';
import { Module } from 'src/modules/entities/module.entity';

export interface User extends Document {
  name: string;
  lastName: string;
  phone: string
  email: string;
  username: string;
  password: string;
  created: Date;
  modified: Date;
  isActived: boolean;
  isAdmin: boolean;
  isNewUser: boolean;
  company: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  modules: Schema.Types.ObjectId[];
  roles: Schema.Types.ObjectId[];
  permissions: Schema.Types.ObjectId[];
}

export const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name field is required'],
    trim: true,
    minLength: [3, 'Name must be at least 3 characters long'],
    maxLength: [100, 'Name must not exceed 200 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'The lastName field is required'],
    trim: true,
    minLength: [3, 'Name must be at least 3 characters long'],
    maxLength: [100, 'Name must not exceed 200 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'The email field is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  phone: {type: String, required: false, trim: true},
  username: { type: String, unique: true, trim: false },
  password: {
    type: String,
    required: [true, 'The password field is required'],
  },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Rol' }],
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  company: { type: String },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  isActived: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false }, // Assuming Role is a separate entity
  isNewUser: { type: Boolean, default: true },
  // Assuming Role is a separate entity
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();  // Si no se ha modificado la contraseña, continúa
    const salt = await bcrypt.genSalt(10);  // Genera un nuevo salt (10 rounds por defecto)
    this.password = await bcrypt.hash(this.password, salt);  // Encripta la contraseña
    next();
});
  

export const UserModel = model<User>('User', UserSchema);
