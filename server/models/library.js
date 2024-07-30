const { Schema, model } = require('mongoose');

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    muscle: {
      type: Schema.Types.ObjectId,
      ref: 'muscle_group',
    },
    images: [
      {
        type: String,
      },
    ],
    video: {
      type: String,
    },
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'Advanced'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const Library = model('library', librarySchema);

module.exports = Library;
