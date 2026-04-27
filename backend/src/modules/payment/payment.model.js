import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['cash', 'card', 'upi'],
    default: 'upi'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  plan: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Yearly']
  },
  upiReference: {
    type: String
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  }
}, { timestamps: true });

// Index for faster queries
paymentSchema.index({ userId: 1, status: 1, createdAt: -1 });

export default mongoose.model('Payment', paymentSchema);