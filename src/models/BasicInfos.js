import mongoose from 'mongoose';

const { Schema } = mongoose;

const basicInfosSchema = new Schema({
    text: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const BasicInfos = mongoose.model('BasicInfos', basicInfosSchema);

export default BasicInfos;
