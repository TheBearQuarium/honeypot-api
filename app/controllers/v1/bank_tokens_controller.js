'use strict';

const Nodal = require('nodal');
const BankToken = Nodal.require('app/models/bank_token.js');

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

    BankToken.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    BankToken.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    BankToken.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1BankTokensController;
