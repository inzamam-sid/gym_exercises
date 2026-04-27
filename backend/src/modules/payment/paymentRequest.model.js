import mongoose from 'mongoose';

const paymentRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  plan: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Yearly'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  upiTransactionId: {
    type: String,
    required: true,
    unique: true
  },
  upiReference: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: null
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

paymentRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('PaymentRequest', paymentRequestSchema);