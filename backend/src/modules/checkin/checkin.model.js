import mongoose from 'mongoose';

const checkinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  checkinTime: {
    type: Date,
    default: Date.now
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Compound index to prevent duplicate check-ins per day
checkinSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('Checkin', checkinSchema);