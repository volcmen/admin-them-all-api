import mongoose from 'mongoose';

const { Schema } = mongoose;

const carouselSchema = new Schema({
    description: { type: String, default: '' },
    link: { type: String, default: '' },
    image: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const Carousels = mongoose.model('Carousels', carouselSchema);

export default Carousels;
