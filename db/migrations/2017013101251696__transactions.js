'use strict';

const Nodal = require('nodal');

class Transactions extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017013101251696;
  }

  up() {

    return [
      this.addColumn('transactions', 'pending', 'boolean', { nullable: false })
    ];

  }

  down() {

    return [];

  }

}

module.exports = Transactions;
