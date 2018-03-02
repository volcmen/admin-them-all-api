import mongoose from 'mongoose';

const { Schema } = mongoose;

const financialSupportSchema = new Schema({
    title: { type: String, default: '' },
    file: { type: String, default: '' },
    format: { type: String, default: '' },
    status: { type: String, default: 'Active' },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
    dateCreated: { type: Date },
    dateUpdated: { type: Date, default: new Date() },
});

const FinancialSupports = mongoose.model('FinancialSupports', financialSupportSchema);

export default FinancialSupports;
