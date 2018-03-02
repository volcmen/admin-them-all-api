import mongoose from 'mongoose';

const { Schema } = mongoose;

const governingBodiesSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    image: { type: String, default: '' },
    role: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const GoverningBodies = mongoose.model('GoverningBodies', governingBodiesSchema);

export default GoverningBodies;
