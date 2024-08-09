// Initiate the database with the data from the JSON files
const db = require('../config/connection');
const categoryData = require('./category.json');
const muscleGroupData = require('./muscle_groups.json');
const { MuscleGroup, Category } = require('../models');

// drop and recreate the database
db.once('open', async () => {
  try {
    await Category.deleteMany({});
    await MuscleGroup.deleteMany({});
    await Category.create(categoryData);
    await MuscleGroup.create(muscleGroupData);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
});
