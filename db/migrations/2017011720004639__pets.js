'use strict';

const Nodal = require('nodal');

class Pets extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011720004639;
  }

  up() {

    return [
      this.addColumn("pets", "name", "string",{"nullable":true})
    ];

  }

  down() {

    return [];

  }

}

module.exports = Pets;
