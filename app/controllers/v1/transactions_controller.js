'use strict';

const stripe = require('stripe')('sk_test_XtAMFVO64j1hd1Fiud3lCVdj');
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

    const amount = this.params.body.amount;
    const checking = this.params.body.checking;
    var context = this;

    stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: checking
    });

    console.log('it happened! WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

    Transaction.create(context.params.body, (err, model) => {
      console.log('it happened! WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

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
