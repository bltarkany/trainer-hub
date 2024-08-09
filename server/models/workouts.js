const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: String,
      required: true,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    week: {
      type: Number,
      required: true,
      default: 0,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'exercise',
      },
    ],
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

// create virtual to get total number of exercises
workoutSchema.virtual('exerciseCount').get(function () {
  return this.exercises.length;
});

// create virtual to get total duration of exercises
workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = model('workout', workoutSchema);

module.exports = Workout;
