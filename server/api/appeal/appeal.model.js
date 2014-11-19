'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppealSchema = new Schema({
  name: String,
  message: String,
  decision: String,
  comment: String,
  is_executed: Boolean,
  created_at: {type: Date, default: Date.now},
  executed_at: Date
});

module.exports = mongoose.model('Appeal', AppealSchema);
