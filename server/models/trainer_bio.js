const { Schema, model } = require('mongoose');

const trainerBioSchema = new Schema(
  {
    trainer_bio: {
      type: String,
      required: true,
      trim: true,
    },
    trainer_image: {
      type: String,
    },
    trainer_specialty: {
      type: String,
      required: true,
      trim: true,
    },
    certifications: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

module.exports = trainerBioSchema;
