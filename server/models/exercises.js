const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema(
  {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'library',
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    rest: {
      type: Number,
    },
    notes: {
      type: String,
    },
    is_complete: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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

const Exercise = model('exercise', exerciseSchema);

module.exports = Exercise;
