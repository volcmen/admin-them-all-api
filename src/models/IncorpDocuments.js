import mongoose from 'mongoose';

const { Schema } = mongoose;

const incorpDocumentsSchema = new Schema({
    title: { type: String, default: '' },
    file: { type: String, default: '' },
    format: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const IncorpDocuments = mongoose.model('IncorpDocuments', incorpDocumentsSchema);

export default IncorpDocuments;
