export default Controller;

/**
 * Takes a model and view and acts as the controller between them
 *
 * @constructor
 * @param {object} model The model instance
 * @param {object} view The view instance
 */
function Controller(model, view) {
  this.model = model;
  this.view = view;

  this.view.bind('addItem', id => this.addItem(id));

  this.view.bind('clearCart', () => this.clearCart());

  this.showCart();
}

/**
 * An event to fire whenever you want to add an item. Simply pass in the event
 * object and it'll handle the DOM insertion and saving of the new item.
 */
Controller.prototype.addItem = function (id) {
  this.model.add(id, () => {
    this.view.render('showCart', this.model.read());
    this._updateTotal();
  })
};


/**
 * An event to fire on load. Will get all items and display them in the
 * cart
 */
Controller.prototype.clearCart = function () {
  this.model.empty(cart => {
    this.view.render('showCart', cart);
  });
};

/**
 * An event to fire on load. Will get all items and display them in the
 * cart.
 */
Controller.prototype.showCart = function () {
  this.model.read(cart => {
    this.view.render('showCart', cart);
    this._updateTotal();
  })
};

/**
 * Updates the pieces of the page which change depending on the remaining
 * number of todos.
 */
Controller.prototype._updateTotal = function () {
  this.model.getTotal(total => {
      this.view.render('showTotal', total);
      this.view.render('showClear', total);
    }
  )
};

