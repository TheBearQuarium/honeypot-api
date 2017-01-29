'use strict';

const Nodal = require('nodal');

class Pets extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017012900320825;
  }

  up() {

    return [
      this.dropColumn("pets", "level"),
      this.dropColumn("pets", "name"),
      this.addColumn('pets', 'name', 'string', { nullable: false })
    ];

  }

  down() {

    return [
    ];

  }

}

module.exports = Pets;
