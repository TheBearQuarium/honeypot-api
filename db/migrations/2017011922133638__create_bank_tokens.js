'use strict';

const Nodal = require('nodal');

class CreateBankTokens extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011922133638;
  }

  up() {

    return [
      this.createTable("bank_tokens", [{"name":"user_id","type":"int"},{"name":"type","type":"string"},{"name":"token","type":"string"}])
    ];

  }

  down() {

    return [
      this.dropTable("bank_tokens")
    ];

  }

}

module.exports = CreateBankTokens;
