'use strict';

const Nodal = require('nodal');

class Transaction extends Nodal.Model {}

Transaction.setDatabase(Nodal.require('db/main.js'));
Transaction.setSchema(Nodal.my.Schema.models.Transaction);

module.exports = Transaction;
