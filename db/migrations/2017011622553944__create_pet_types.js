'use strict';

const Nodal = require('nodal');

class CreatePetTypes extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011622553944;
  }

  up() {

    return [
      this.createTable("pet_types", [{"name":"name","type":"string"},{"name":"model","type":"json"}])
    ];

  }

  down() {

    return [
      this.dropTable("pet_types")
    ];

  }

}

module.exports = CreatePetTypes;
