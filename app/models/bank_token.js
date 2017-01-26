'use strict';

const Nodal = require('nodal');

class BankToken extends Nodal.Model {}

BankToken.setDatabase(Nodal.require('db/main.js'));
BankToken.setSchema(Nodal.my.Schema.models.BankToken);

module.exports = BankToken;
