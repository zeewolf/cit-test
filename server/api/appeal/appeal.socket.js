/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Appeal = require('./appeal.model');

exports.register = function(socket) {
  Appeal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Appeal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('appeal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('appeal:remove', doc);
}