const { Schema, Types } = require('mongoose');

const bodyStatsSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    weight_unit: {
      type: String,
      default: 'lbs',
      enum: ['lbs', 'kg'],
    },
    weight_progress: [
      {
        weight: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    height: {
      type: Number,
      required: true,
    },
    height_unit: {
      type: String,
      default: 'in',
      enum: ['in', 'cm'],
    },
    // add dob to calculate age
    dob: {
      type: Date,
      required: true,
    },
    profile_pic: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    progress_pics: [
      {
        pic: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // add body fat percentage
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// virtual to calculate BMI
// bodyStatsSchema.virtual('bmi').get(function () {
//   return (this.weight / (this.height * this.height)) * 703;
// });

// // virtual to calculate BMR
// bodyStatsSchema.virtual('bmr').get(function () {
//   return 66 + 6.23 * this.weight + 12.7 * this.height - 6.8 * this.age;
// });

// virtual to calculate daily caloric intake
// bodyStatsSchema.virtual('dailyCaloricIntake').get(function () {
//   return this.bmr * 1.2;
// });

// virtual to calculate age
bodyStatsSchema.virtual('age').get(function () {
  const today = new Date();
  const dob = new Date(this.dob);
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
});

module.exports = bodyStatsSchema;
