// import and export all models
const User = require('./users');
const Program = require('./programs');
const Exercise = require('./exercises');
const ClientProgram = require('./client_program');
const Library = require('./library');
const Category = require('./category');
const MuscleGroup = require('./muscle_group');
const Workout = require('./workouts');

module.exports = {
  User,
  Program,
  Exercise,
  ClientProgram,
  Library,
  Category,
  MuscleGroup,
  Workout,
};
