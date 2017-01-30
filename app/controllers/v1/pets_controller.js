'use strict';

const Nodal = require('nodal');
const Pet = Nodal.require('app/models/pet.js');
const Transaction = Nodal.require('app/models/transaction.js');

class V1PetsController extends Nodal.Controller {

  index() {
    Pet.query()
      .where(this.params.query)
      .orderBy('created_at')
      .end((err, petModels) => {
        petModels.forEach(pet => {
          // get total spent on this pet
          Transaction.query()
            .join('item')
            .join('pet')
            .orderBy('created_at')
            // query for pet id
            .where({'pet_id__is': pet._data.id})
            .end((err, transactionModels) => {
              // total for goal_progress
              let total = 0;

              // levels for happiness/hunger
              let prevDate;
              let happiness = 25;
              let hunger = 25;

              //loop and do all the things
              transactionModels.forEach(model => {
                // add amount spent to total
                total += model._data.amount

                // calculate hunger/happiness levels
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
                if (itemData.type === 'food') {
                  hunger += itemData.effect * 10
                } else if (itemData.type === 'accessory') {
                  happiness += itemData.effect * 10

                } else {
                  happiness += itemData.effect * 10;
                  hunger += itemData.effect * 5;
                }

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


              // INCLUDE THESE VALUES IN RESPONSE
              pet._data.goal_progress = total;
              pet._data.happiness = happiness;
              pet._data.hunger = hunger;

              if (pet === petModels[petModels.length - 1]) {
                this.respond(err || petModels, [
                  'id',
                  'name',
                  'pet_type_id',
                  'goal_amt',
                  'goal_name',
                  'goal_progress',
                  'happiness',
                  'hunger'
                ]);
              }
            });
        });
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
