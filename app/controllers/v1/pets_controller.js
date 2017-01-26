'use strict';

const Nodal = require('nodal');
const Pet = Nodal.require('app/models/pet.js');

class V1PetsController extends Nodal.Controller {

  index() {
    Pet.query()
      .join('user')
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);

      });

  }

  show() {
    Pet.find(this.params.route.id, (err, model) => {
      this.respond(err ||  model );

    });

  }

  create() {

    Pet.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Pet.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Pet.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1PetsController;
