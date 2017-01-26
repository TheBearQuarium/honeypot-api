'use strict';

const Nodal = require('nodal');
const Transaction = Nodal.require('app/models/transaction.js');

class V1TotalsController extends Nodal.Controller {

  get() {
    Transaction.query()
      .where(this.params.query)
      .end((err, models) => {
        let total = 0;
        models.forEach(model => {
          console.log(total);
          total += model._data.amount });
        this.respond(err || { total });
      })
    // this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {

    this.badRequest();

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1TotalsController;
