const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ~~~~~ Add schema below ~~~~~ //
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username required']
  },
  friends: {
    type: Array,
    default: []
  },
  angel_score: {
    type: Number,
    min: [0, 'angle_score can not be below 0'],
    max: [100, 'angle_score can not be above 100'],
    default: 0
  },
  demon_score: {
    type: Number,
    min: [0, 'angle_score can not be below 0'],
    max: [100, 'angle_score can not be above 100'],
    default: 0
  }
});

// ~~~~~ Export your schema below ('collection_name', your_schema)
const model = mongoose.model('Users', userSchema );

module.exports = model;
