'use strict';

const Nodal = require('nodal');

class CreatePets extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011622585674;
  }

  up() {

    return [
      this.createTable("pets", [{"name":"user_id","type":"int"},{"name":"pet_type_id","type":"int"},{"name":"goal_amt","type":"int"},{"name":"goal_name","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("pets")
    ];

  }

}

module.exports = CreatePets;
