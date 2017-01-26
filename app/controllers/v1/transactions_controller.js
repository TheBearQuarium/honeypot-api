'use strict';

const Nodal = require('nodal');
const Transaction = Nodal.require('app/models/transaction.js');

class V1TransactionsController extends Nodal.Controller {

  index() {

    Transaction.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Transaction.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Transaction.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Transaction.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Transaction.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1TransactionsController;
