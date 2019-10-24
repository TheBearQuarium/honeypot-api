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
    const pending = this.params.body.pending;
    const user = this.params.body.user_id;
    const newBody = this.params;

    Transaction.query()
    .where({ user_id__is: user, pending: true })
    .end((err, transactionModels) => {

      if (err => {
        console.warn(err);
      });
      if (transactionModels.length) {
        const pendingAmount = transactionModels.map(model => model._data.amount)
        .reduce((total, current) => total + current);
        const total = pendingAmount + amount;
        if (total >= 500) {
          newBody.body.pending = false;
          transactionModels.forEach(item => {
            Transaction.update(item._data.id, { pending: false }, (err, model) => {
              this.respond(err || model);
            });
          });
          stripe.charges.create({
            amount: total,
            currency: 'usd',
            customer: checking,
          });
          /*
          * UNCOMMENT WHEN TRANSFERS ARE AVAILABLE;
          * INSUFFICIENT FUNDS ARE THROWING AN ERROR
          *
          * stripe.transfers.create({
          *   amount: total,
          *   currency: 'usd',
          *   destination: 'default_for_currency',
          * },
          *   { stripe_account: savings }
          * );
          */
        }
      }
      Transaction.create(newBody.body, (err, model) => {
        this.respond(err || model);
      });
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
