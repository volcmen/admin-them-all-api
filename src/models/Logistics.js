import mongoose from 'mongoose';

const { Schema } = mongoose;

const logisticSchema = new Schema({
    text: { type: String, default: '' },
    category: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const Logistics = mongoose.model('Logistics', logisticSchema);

export default Logistics;
