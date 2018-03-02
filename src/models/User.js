import mongoose from 'mongoose';
import crypto from 'crypto';
import config from 'config';

const secret = config.get('secret');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accountType: { type: String, default: 'User' },
    lastUsedSite: { type: String, default: null },
    theme: { type: String, default: null },
    lastLogIn: { type: Date },
    status: { type: String, default: 'Active' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const encryptPassword = password => crypto.createHmac('sha512', secret).update(password).digest('hex');

const User = mongoose.model('User', userSchema);

export { User, encryptPassword };
