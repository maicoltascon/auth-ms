import { Schema, model, Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export interface Session extends Document {
    user: User[];
    refreshToken: string;
    expires: Date;
    created: Date;
    modified: Date;
    isActive: boolean;
    ip: string;
    os: string;
    browser: string;
    browser_version: string;
    istable: boolean;
    ismovil: boolean;
    isbrowser:boolean;
};

// Define schema for session id x 
const SessionSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    refreshToken: { type: String, required: true },
    expires: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    ip: { type: String },
    os: { type: String },
    browser: { type: String },
    browser_version: { type: String },
    istable: { type: Boolean },
    ismovil: { type: Boolean },
    isbrowser: { type: Boolean },
});

export const SessionModel = model<Session>('sessions', SessionSchema);
