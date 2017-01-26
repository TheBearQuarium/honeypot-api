'use strict';

const Nodal = require('nodal');

class Items extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011720113464;
  }

  up() {

    return [
      this.addForeignKey('items', 'pet_types')
    ];

  }

  down() {

    return [];

  }

}

module.exports = Items;
