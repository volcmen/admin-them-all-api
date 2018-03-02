import mongoose from 'mongoose';

const { Schema } = mongoose;

const findInfosSchema = new Schema({
    location: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
    },
    contactInfo: {
        address: { type: String, default: '' },
        phone: { type: String, default: '' },
        mail: { type: String, default: '' },
    },
    backImage: { type: String, default: '' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const HowToFindInfos = mongoose.model('HowToFindInfos', findInfosSchema);

export default HowToFindInfos;
