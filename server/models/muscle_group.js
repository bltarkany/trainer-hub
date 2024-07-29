const { Schema, model } = require('mongoose');

const muscleGroupSchema = new Schema(
  {
    muscle_group: {
      type: String,
      required: true,
      trim: true,
    },
    muscle_group_description: {
      type: String,
      required: true,
      trim: true,
    },
    muscle_group_image: {
      type: String,
      required: true,
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

const MuscleGroup = model('muscle_group', muscleGroupSchema);

module.exports = MuscleGroup;
