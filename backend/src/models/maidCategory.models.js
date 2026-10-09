import mongoose from 'mongoose';

const maidCategorySchema = new mongoose.Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flat',
      required: [true, 'Flat ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Category name is required (e.g. Cooking, Cleaning)'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const MaidCategory = mongoose.model('MaidCategory', maidCategorySchema);
