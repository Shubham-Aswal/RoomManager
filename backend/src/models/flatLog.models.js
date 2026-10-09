import mongoose from 'mongoose';

const flatLogSchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    action: {
      type: String,
      required: [true, 'Log action description is required'],
      trim: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export const FlatLog = mongoose.model('FlatLog', flatLogSchema);
