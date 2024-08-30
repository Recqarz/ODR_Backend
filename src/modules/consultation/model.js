import mongoose from 'mongoose';

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    proof: {
        type: String,  // Assuming proof is a file path or URL
        required: true,
    },
    defaulter_name: {
        type: String,
        required: true,
    },
    defaulter_email: {
        type: String,
        required: false,
    },
    defaulter_phone: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('Query', QuerySchema);
