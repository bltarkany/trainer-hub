const { Schema, model } = require('mongoose');

const programSchema = new Schema(
  {
    program_name: {
      type: String,
      required: true,
      trim: true,
    },
    program_type: {
      type: String,
      required: true,
    },
    program_description: {
      type: String,
      required: true,
      trim: true,
    },
    program_duration: {
      type: Number,
      required: true,
    },
    program_duration_unit: {
      type: String,
      default: 'weeks',
      enum: ['days', 'weeks', 'months'],
    },
    program_level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    program_workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'workout',
      },
    ],
    program_creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    program_created: {
      type: Date,
      default: Date.now,
    },
    program_updated: {
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

const Program = model('program', programSchema);

module.exports = Program;
