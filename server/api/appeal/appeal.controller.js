'use strict';

var _ = require('lodash');
var Appeal = require('./appeal.model');

// Get list of appeals
exports.index = function(req, res) {
  Appeal.find(function (err, appeals) {
    if(err) { return handleError(res, err); }
    return res.json(200, appeals);
  });
};

// Get a single appeal
exports.show = function(req, res) {
  Appeal.findById(req.params.id, function (err, appeal) {
    if(err) { return handleError(res, err); }
    if(!appeal) { return res.send(404); }
    return res.json(appeal);
  });
};

// Creates a new appeal in the DB.
exports.create = function(req, res) {
  Appeal.create(req.body, function(err, appeal) {
    if(err) { return handleError(res, err); }
    return res.json(201, appeal);
  });
};

// Updates an existing appeal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Appeal.findById(req.params.id, function (err, appeal) {
    if (err) { return handleError(res, err); }
    if(!appeal) { return res.send(404); }
    var old_is_executed = appeal.is_executed;
    var updated = _.merge(appeal, req.body);
    if (updated.is_executed && !old_is_executed) {
      updated.executed_at = Date.now();
    }
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, appeal);
    });
  });
};

// Deletes a appeal from the DB.
exports.destroy = function(req, res) {
  Appeal.findById(req.params.id, function (err, appeal) {
    if(err) { return handleError(res, err); }
    if(!appeal) { return res.send(404); }
    appeal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
