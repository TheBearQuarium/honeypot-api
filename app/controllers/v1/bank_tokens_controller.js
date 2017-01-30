'use strict';

require('dotenv').config();
const plaid = require('plaid');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Nodal = require('nodal');
const BankToken = Nodal.require('app/models/bank_token.js');

const plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID,
                                   process.env.PLAID_SECRET,
                                   plaid.environments.tartan);


class V1BankTokensController extends Nodal.Controller {

  index() {
    BankToken.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }

  show() {
    BankToken.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

  create() {
    const public_token = this.params.body.public_token;
    const account_id = this.params.body.account_id;
    const user_id = this.params.body.user_id;
    const type = this.params.body.type;
    const name = this.params.body.name;

    // BankToken.query()
    //   .where(this.params.query)
    //   .end((err, models) => {
    //
    //     this.respond(err || models);
    //
    //   });

    var context = this;

    plaidClient.exchangeToken(public_token, account_id, function(err, res) {
        if (err != null) {
          console.log(err);
        } else {
          const access_token = res.access_token;
          const bank_account_token = res.stripe_bank_account_token;
          if (type === 'checking') {
            stripe.customers.create({
              source: bank_account_token
            }, function(err, customer) {
              if (err) {
                console.log(err);
              } else {
                const newToken = {
                  user_id: user_id,
                  type: type,
                  name: name,
                  token: customer.id,
                }
                BankToken.create(newToken, (err, model) => {
                  context.respond(err || model);
                });
              }
            });
          } else {
            stripe.accounts.create({
              managed: true,
              country: 'US',
              external_account: bank_account_token,
              legal_entity: {
                dob: {
                  day: 26,
                  month: 2,
                  year: 1992,
                },
                first_name: 'Connor',
                last_name: 'Parsons',
                type: 'individual',
              },
              tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: '98.172.185.234',
              },
            }, function (err, account) {
              if (err) {
                console.log(err);
              } else {
                const newToken = {
                  user_id: user_id,
                  type: type,
                  name: name,
                  token: account.id
                }
                BankToken.update(context.params.route.id, newToken, (err, model) => {
                  context.respond(err || model);
                });
              }
            });
          }
        }
    });
  }
  update() {
    // BankToken.update(this.params.route.id, this.params.body, (err, model) => {
    //
    //   this.respond(err || model);
    //
    // });
    const public_token = this.params.body.public_token;
    const account_id = this.params.body.account_id;
    const user_id = this.params.body.user_id;
    const type = this.params.body.type;
    const name = this.params.body.name;

    var context = this;

    plaidClient.exchangeToken(public_token, account_id, function(err, res) {
        if (err != null) {
          console.log(err);
        } else {
          const access_token = res.access_token;
          const bank_account_token = res.stripe_bank_account_token;
          if (type === 'checking') {
            stripe.customers.create({
              source: bank_account_token
            }, function(err, customer) {
              if (err) {
                console.log(err);
              } else {
                const newToken = {
                  user_id: user_id,
                  type: type,
                  name: name,
                  token: customer.id,
                }
                BankToken.update(context.params.route.id, newToken, (err, model) => {
                  context.respond(err || model);
                });
              }
            });
          } else {
            stripe.accounts.create({
              managed: true,
              country: 'US',
              external_account: bank_account_token,
              legal_entity: {
                dob: {
                  day: 26,
                  month: 2,
                  year: 1992,
                },
                first_name: 'Connor',
                last_name: 'Parsons',
                type: 'individual',
              },
              tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: '98.172.185.234',
              },
            }, function (err, account) {
              if (err) {
                console.log(err);
              } else {
                const newToken = {
                  user_id: user_id,
                  type: type,
                  name: name,
                  token: account.id,
                }
                BankToken.update(context.params.route.id, newToken, (err, model) => {
                  context.respond(err || model);
                });
              }
            });
          }
        }
    });
  }

  destroy() {
    BankToken.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }
}

module.exports = V1BankTokensController;
