import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);
const ConsultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
    address: {
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
ConsultationSchema.plugin(AutoIncrement, {inc_field: 'consuktantNumber'});

export default mongoose.model('Consultation', ConsultationSchema);

