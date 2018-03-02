import mongoose from 'mongoose';

const { Schema } = mongoose;

const dopInfosSchema = new Schema({
    text: { type: String, default: '' },
    category: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const DopInfos = mongoose.model('DopInfos', dopInfosSchema);

export default DopInfos;
