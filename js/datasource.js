import {$pick} from './helpers';

export default Datasource;
/**
 * Creates a new client side storage object and will create an empty
 * collection if no collection already exists.
 *
 * @param {string} name The name of our DB we want to use
 */
function Datasource(name) {
  this._dbName = name;

  if (!localStorage[name]) {
    const data = {
      cart: []
    };

    localStorage[name] = JSON.stringify(data);
  }
}

/**
 * Will retrieve all data from the collection
 *
 * @param {function} callback The callback to fire upon retrieving data
 */
Datasource.prototype.findAll = function (callback) {
  callback = callback || function () {
    }
  const cart = JSON.parse(localStorage[this._dbName]).cart;
  callback.call(this, cart);
  return cart;
};

/**
 * Add an item to the cart or increase the number of teh selected item.
 *
 * @param {string} id The ID of the added item.
 * @param {function} callback The callback to fire after saving
 */
Datasource.prototype.add = function (item, callback) {
  var data = JSON.parse(localStorage[this._dbName]);
  var cart = data.cart;

  callback = callback || function () {
    }

  const edit = $pick(cart, item.code);
  if (edit) {
    edit.quantity++;
  }
  else {
    cart.push({id: item.code, name: item.name, quantity: 1});
  }

  localStorage[this._dbName] = JSON.stringify(data);

  callback.call(this, cart);
}

/**
 * Remove an item from the cart based on its ID
 *
 * @param {string} code The ID of the item to remove
 * @param {function} callback The callback to fire after saving
 */
Datasource.prototype.remove = function (id, callback) {
  const data = JSON.parse(localStorage[this._dbName])
  const cart = data.cart;

  const item = $pick(cart, id);

  if (item) {
    item.quantity--;
  }

  if (!item.quantity) {
    cart.splice(cart.indexOf(item), 1);
  }

  localStorage[this._dbName] = JSON.stringify(data);
  callback.call(this, JSON.parse(localStorage[this._dbName]).cart);
};

/**
 * Empty all storage.
 *
 * @param {function} callback The callback to fire after dropping the data
 */
Datasource.prototype.empty = function (callback) {
  localStorage[this._dbName] = JSON.stringify({cart: []});
  callback.call(this, JSON.parse(localStorage[this._dbName]).cart);
}
