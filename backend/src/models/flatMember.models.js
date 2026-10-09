import mongoose from 'mongoose';

const flatMemberSchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    role: {
      type: String,
      enum: {
        values: ['owner', 'admin', 'member'],
        message: '{VALUE} is not a valid member role',
      },
      default: 'member',
      trim: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      default: null,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent adding the same user to the same flat multiple times
flatMemberSchema.index({ flatId: 1, userId: 1 }, { unique: true });

export const FlatMember = mongoose.model('FlatMember', flatMemberSchema);
