import mongoose from 'mongoose';

const flatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Flat name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Flat address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator user ID is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Flat = mongoose.model('Flat', flatSchema);
