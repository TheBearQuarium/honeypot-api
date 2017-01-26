'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');

class V1AccessTokensController extends Nodal.Controller {

  create() {

    AccessToken.login(this.params, (err, accessToken) => {

      this.respond(err || accessToken);
    })

    // AccessToken.create(this.params.body, (err, model) => {
    //
    //   this.respond(err || model);
    //
    // });

  }

  update() {

    AccessToken.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    AccessToken.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });


  }

  index() {

    AccessToken.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    AccessToken.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1AccessTokensController;
