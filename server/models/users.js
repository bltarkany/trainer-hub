const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyStatsSchema = require('./body_stats');
const trainerBioSchema = require('./trainer_bio');

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    //   gym ownewrship - for trainers
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      default: 'client',
      required: true,
      enum: ['client', 'trainer'],
    },
    //   not sure if we need this - be used to connect trainer/user
    savedTrainers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    //   body stats schema - for tracking user progress
    bodyStats: bodyStatsSchema,
    // trainer bio - for trainers
    trainer_bio: trainerBioSchema,
    // users programs - for tracking user progress
    programs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'client_program',
      },
    ],
    //   user workouts - for tracking user progress
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'workout',
      },
    ],
    //   active client or trainer
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// encrypt password before saving or modifying user data
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// method to compare and validate password for login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
