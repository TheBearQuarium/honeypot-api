'use strict';

const Nodal = require('nodal');
const Item = Nodal.require('app/models/item.js');

class V1ItemsController extends Nodal.Controller {

  index() {
    Item.query()
      .join('petType')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models, ['id', 'name', 'cost', 'type', 'effect', 'image', {'petType': ['name']}]);

      });

  }

  show() {

    Item.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Item.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Item.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Item.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1ItemsController;
