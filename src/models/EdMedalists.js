import mongoose from 'mongoose';

const { Schema } = mongoose;

const edMedalistsSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    medalType: { type: String, default: '' },
    year: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const EdMedalists = mongoose.model('EdMedalists', edMedalistsSchema);

export default EdMedalists;
