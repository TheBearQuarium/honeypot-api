'use strict';

const Nodal = require('nodal');

class PetType extends Nodal.Model {}

PetType.setDatabase(Nodal.require('db/main.js'));
PetType.setSchema(Nodal.my.Schema.models.PetType);

module.exports = PetType;
