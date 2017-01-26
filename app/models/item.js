'use strict';

const Nodal = require('nodal');

class Item extends Nodal.Model {}

Item.setDatabase(Nodal.require('db/main.js'));
Item.setSchema(Nodal.my.Schema.models.Item);

module.exports = Item;
