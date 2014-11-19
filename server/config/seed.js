/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Appeal = require('../api/appeal/appeal.model');


Appeal.find({}).remove(function() {
  Appeal.create({
    name : 'Звонок',
    message : 'Звонок 1.'
  }, {
    name : 'Звонок',
    message : 'Звонок 2.'
  }, {
    name : 'Посетитель',
    message : 'Посетитель 1.'
  },  {
    name : 'Звонок',
    message : 'Звонок 3.'
  },  {
    name : 'Звонок',
    message : 'Звонок 4.'
  },{
    name : 'Посетитель',
    message : 'Посетитель 2.'
  },{
    name : 'Звонок',
    message : 'Звонок завершен.',
    is_executed: true,
    decision: 'Перезвоню',
    comment: 'Запланировать пол-часа звонка'
  });
});
