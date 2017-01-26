'use strict';

const Nodal = require('nodal');

class CreateItems extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011623005739;
  }

  up() {

    return [
      this.createTable("items", [{"name":"pet_type_id","type":"int"},{"name":"type","type":"string"},{"name":"name","type":"string"},{"name":"image","type":"json"},{"name":"cost","type":"int"},{"name":"effect","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("items")
    ];

  }

}

module.exports = CreateItems;
