'use strict';

const Nodal = require('nodal');
const Pet = Nodal.require('app/models/pet.js');
const Transaction = Nodal.require('app/models/transaction.js');


class V1PetStatsController extends Nodal.Controller {

  get() {
    // lol prepare to enter the rat's nest
    // get pet -- should query by ID
    Pet.query()
      .where(this.params.query)
      .end((err, petModels) => {

        // get total spent on this pet
        Transaction.query()
          .join('item')
          .join('pet')
          .orderBy('created_at')
          // query for pet id
          .where({'pet_id__is': petModels[0]._data.id})
          .end((err, transactionModels) => {
            // total for goal_progress
            let total = 0;

            // levels for happiness/hunger
            let prevDate;
            let happiness = 25;
            let hunger = 25;
            const accessories = {
              hat: false,
              necklace: false,
              balloons: false
            }

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
                // check if accessory is valid in inventory
                let expDate = new Date(date.valueOf() + (7 * 24 * 60 * 60 * 1000));
                if (new Date().valueOf() <= expDate.valueOf()) {
                  accessories[itemData.name] = true;
                }
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
            petModels[0]._data.goal_progress = total;
            petModels[0]._data.happiness = happiness;
            petModels[0]._data.hunger = hunger;
            petModels[0]._data.accessories = accessories;

            this.respond(err || petModels[0], [
              'id',
              'name',
              'pet_type_id',
              'goal_amt',
              'goal_name',
              'goal_progress',
              'happiness',
              'hunger',
              'accessories'
            ]);
          });

      });
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

module.exports = V1PetStatsController;
