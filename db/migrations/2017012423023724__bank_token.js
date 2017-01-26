'use strict';

const Nodal = require('nodal');

class BankToken extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017012423023724;
  }

  up() {

    return [
      this.addColumn('bank_tokens', 'name', 'string', {nullable: false})
    ];

  }

  down() {

    return [];

  }

}

module.exports = BankToken;
