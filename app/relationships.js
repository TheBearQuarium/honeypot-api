'use strict';

const Nodal = require('nodal');

/* Include this file to enable Model relationships */

/* For example...

  const Post = Nodal.require('app/models/post.js');
  const Comment = Nodal.require('app/models/comment.js');

  Comment.joinsTo(Post, {multiple: true});

*/
const Item = Nodal.require('app/models/item.js');
const PetType = Nodal.require('app/models/pet_type.js');
const Pet = Nodal.require('app/models/pet.js');
const Transaction = Nodal.require('app/models/transaction.js');
const User = Nodal.require('app/models/user.js');
const BankToken = Nodal.require('app/models/bank_token.js');

Pet.joinsTo(User, {multiple: true});
Pet.joinsTo(PetType, {multiple: true});
Item.joinsTo(PetType, {multiple: true});
Transaction.joinsTo(User, {multiple: true});
Transaction.joinsTo(Pet, {multiple: true});
Transaction.joinsTo(Item, {multiple: true});
User.joinsTo(BankToken, {multiple: true});


module.exports = {}; // Don't need to export anything
