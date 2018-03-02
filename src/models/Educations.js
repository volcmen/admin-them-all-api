import mongoose from 'mongoose';

const { Schema } = mongoose;

const educationSchema = new Schema({
    text: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const Educations = mongoose.model('Educations', educationSchema);

export default Educations;
