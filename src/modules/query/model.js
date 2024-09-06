import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    required: true,
    default:false
},
  category: {
    type: String,
    required: true,
    // enum: ['Category1', 'Category2', 'Category3'], // Replace with actual categories
    trim: true
  }
}, {
  timestamps: true
});
QuerySchema.plugin(AutoIncrement, {inc_field: 'queryNumber'});

const Query = mongoose.model('Query', QuerySchema);

export default Query;