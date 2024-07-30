const { Schema, model } = require('mongoose');

// Create a new Schema for the client_program
// This will connect a user to a program
const clientProgramSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program',
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date,
  },
  progress: [
    {
      type: Schema.Types.ObjectId,
      ref: 'workout',
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  completed_date: {
    type: Date,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const ClientProgram = model('client_program', clientProgramSchema);

module.exports = ClientProgram;
