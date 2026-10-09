import mongoose from 'mongoose';

const maidSchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaidCategory',
      required: [true, 'Maid Category ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Maid name is required'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    salary: {
      type: Number,
      required: [true, 'Salary amount is required'],
      min: [0, 'Salary cannot be negative'],
    },
    frequency: {
      type: String,
      enum: {
        values: ['daily', 'weekly', 'bi-weekly', 'monthly'],
        message: '{VALUE} is not a valid frequency',
      },
      default: 'monthly',
      trim: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const Maid = mongoose.model('Maid', maidSchema);
