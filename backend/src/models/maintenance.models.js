import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Maintenance task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    frequency: {
      type: String,
      enum: {
        values: ['one-time', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'yearly'],
        message: '{VALUE} is not a valid maintenance frequency',
      },
      default: 'monthly',
      trim: true,
    },
    lastCompleted: {
      type: Date,
      default: null,
    },
    nextDue: {
      type: Date,
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in_progress', 'completed', 'overdue'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
