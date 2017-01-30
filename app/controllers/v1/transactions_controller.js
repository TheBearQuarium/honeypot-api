'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET);
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
    const savings = this.params.body.savings;
    var context = this;

    stripe.charges.create({
      amount: amount,
      currency: 'usd',
      customer: checking,
    });
    stripe.transfers.create({
      amount: amount,
      currency: 'usd',
      destination: 'default_for_currency',
    },
      { stripe_account: savings }
    );

    Transaction.create(context.params.body, (err, model) => {
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
