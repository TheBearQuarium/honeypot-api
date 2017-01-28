'use strict';

const Nodal = require('nodal');

class Pets extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017012823404104;
  }

  up() {

    return [
      this.addColumn('pets', 'level', 'int', { nullable: false })
    ];

  }

  down() {

    return [];

  }

}

module.exports = Pets;
