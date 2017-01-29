'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

class UsersController extends Nodal.Controller {

  index() {

    User.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    User.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {
    User.query()
      .where({ username__is: this.params.body.username })
      .end((err, models) => {
        if (models.length) {
          this.respond('username taken')
        } else {
          User.create(this.params.body, (err, model) => {
            this.respond(err || model);
          });
        }
      })

  }

  update() {

    User.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    User.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = UsersController;
