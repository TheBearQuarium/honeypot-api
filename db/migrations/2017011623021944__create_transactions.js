'use strict';

const Nodal = require('nodal');

class CreateTransactions extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011623021944;
  }

  up() {

    return [
      this.createTable("transactions", [{"name":"user_id","type":"int"},{"name":"pet_id","type":"int"},{"name":"item_id","type":"int"},{"name":"amount","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("transactions")
    ];

  }

}

module.exports = CreateTransactions;
