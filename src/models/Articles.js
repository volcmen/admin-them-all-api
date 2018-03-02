import mongoose from 'mongoose';

const { Schema } = mongoose;

const articlesSchema = new Schema({
    category: { type: String, default: '' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    link: { type: String, default: '' },
    image: { type: String, default: '' },
    images: { type: Array, default: [] },
    video: { type: String, default: '' },
    files: { type: Array, default: [] },
    status: { type: String, default: 'Active' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const Articles = mongoose.model('Articles', articlesSchema);

export default Articles;
