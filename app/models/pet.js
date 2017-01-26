'use strict';

const Nodal = require('nodal');

class Pet extends Nodal.Model {}

Pet.setDatabase(Nodal.require('db/main.js'));
Pet.setSchema(Nodal.my.Schema.models.Pet);

module.exports = Pet;
