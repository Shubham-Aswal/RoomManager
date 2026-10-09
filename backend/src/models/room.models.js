import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    capacity: {
      type: Number,
      required: [true, 'Room capacity is required'],
      min: [1, 'Capacity must be at least 1 person'],
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export const Room = mongoose.model('Room', roomSchema);
