'use strict';

const Nodal = require('nodal');
const Transaction = Nodal.require('app/models/transaction.js');

class V1LevelsController extends Nodal.Controller {

  get() {
    let prevDate;
    Transaction.query()
      .join('item')
      .join('pet')
      .orderBy('created_at')
      .where(this.params.query)
      .end((err, models) => {
        // base state from creating pet
        let happiness = 25;
        let hunger = 25;

        // calculate previous state
        models.forEach(model => {
          let itemData = model._joinsCache.item._data;
          let petData = model._joinsCache.pet._data;
          let data = model._data

          let date = new Date(data.created_at);
          // first iteration - start at pet creation
          if (!prevDate) prevDate = new Date(petData.created_at);

          // get time between interactions
          let diff = date - prevDate;

          // turn into hours
          let hh = Math.floor(diff / 1000 / 60 / 60);

          // reduce hunger and happiness by time
          if (hh > 0) {
            hunger -= hh * 2;
            happiness -= hh * 2;
          }

          // no negative states
          if (hunger < 0) hunger = 0;
          if (happiness < 0) happiness = 0;

          // update state based on item bought
          itemData.type === 'food' ?
          hunger += itemData.effect * 10 :
          happiness += itemData.effect * 10;

          // cap at 100
          if (hunger > 100) hunger = 100;
          if (happiness > 100) happiness = 100;

          prevDate = date;
        });

        // run one last subtraction from current date
        let date = new Date();
        let diff = date - prevDate;
        let hh = Math.floor(diff / 1000 / 60 / 60);
        if (hh > 0) {
          hunger -= hh * 2;
          happiness -= hh * 2;
        }
        if (hunger < 0) hunger = 0;
        if (happiness < 0) happiness = 0;

        this.respond( err || {happiness, hunger});
      })

    // this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {

    this.badRequest();

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1LevelsController;
