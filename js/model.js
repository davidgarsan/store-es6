export default Model;

import Products from './products';
import Discounts from './discounts';

/**
 * Creates a new Model instance and hooks up the storage.
 *
 * @constructor
 * @param {object} storage A reference to the client side storage class
 */
function Model(datasource) {
  this.datasource = datasource;
}

/**
 * Finds and returns a model in storage. If no query is given it'll simply
 * return everything. If you pass in a string or number it'll look that up as
 * the ID of the model to find. Lastly, you can pass it an object to match against.
 *
 * @param {string|number|object} [query] A query to match models against
 * @param {function} [callback] The callback to fire after the model is found
 *
 * @example
 * model.read(1, func); // Will find the model with an ID of 1
 * model.read('1'); // Same as above
 * //Below will find a model with foo equalling bar and hello equalling world.
 * model.read({ foo: 'bar', hello: 'world' });
 */
Model.prototype.read = function (callback) {
  callback = callback || function() {
    };
  return this.datasource.findAll(callback);
};

/**
 * Updates a model by giving it an ID, data to update, and a callback to fire when
 * the update is complete.
 *
 * @param {number} id The id of the model to update
 * @param {function} callback The callback to fire when the update is complete.
 */
Model.prototype.add = function (id, callback) {
  this.datasource.add(Products.filter(item => item.code === id)[0], callback)
};

/**
 * Removes a model from cart
 *
 * @param {number} id The ID of the model to remove
 * @param {function} callback The callback to fire when the removal is complete.
 */
Model.prototype.remove = function (id, callback) {
  this.datasource.remove(id, callback)
};

/**
 * Remove ALL data from cart.
 *
 * @param {function} callback The callback to fire when the storage is wiped.
 */
Model.prototype.empty = function (callback) {
  this.datasource.empty(callback);
};

/**
 * Returns the calculated total amount of the cart.
 */
Model.prototype.getTotal = function (callback) {
  let i, l, total = 0;
  const cart = this.datasource.findAll();
  const search = item => item.code === cart[i].id;

  if (cart.length) {
    for(i = 0, l = cart.length; i < l; i++) {
      const product = Products.filter(search)[0];

      // Apply discounts if exists for the product.
      if (Discounts[product.code]) {
        cart[i].subtotal = Discounts[product.code].deal(cart[i], product.price);
      }
      else {
        cart[i].subtotal = product.price * cart[i].quantity;
      }
      total += cart[i].subtotal;
    }
  }
  callback(Math.round(total * 100) / 100);
};
