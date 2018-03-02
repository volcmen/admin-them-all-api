import mongoose from 'mongoose';

const { Schema } = mongoose;

const sitesDBSchema = new Schema({
    title: { type: String, default: 'No Title' },
    link: { type: String, default: 'No Link' },
    status: { type: String, default: 'Active' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const SitesDB = mongoose.model('SitesDB', sitesDBSchema);

export default SitesDB;
