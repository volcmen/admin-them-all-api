import mongoose from 'mongoose';

const { Schema } = mongoose;

const finAndEconActSchema = new Schema({
    title: { type: String, default: '' },
    file: { type: String, default: '' },
    format: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const FinAndEconActs = mongoose.model('FinAndEconActs', finAndEconActSchema);

export default FinAndEconActs;
