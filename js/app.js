import '../css/style.css';

import Datasource from './datasource';
import View from './view';
import Model from './model';
import Template from './template';
import Controller from './controller';
import {qs, $on} from './helpers';
import Products from './products';
import Discounts from './discounts';

/**
 * Sets up a small store.
 *
 * @param {string} name The name of the store for localStorage.
 */
function WebStore(name) {
  this.datasource = new Datasource(name);
  this.model = new Model(this.datasource);
  this.template = new Template();
  this.view = new View(this.template);
  this.controller = new Controller(this.model, this.view);
}

function render() {
  const $list = qs('.products-list');
  const htmlString = [];

  for (const item of Products) {
    const styleClass = `prod_${item.name.replace(' ', '_').toLowerCase()}`;
    const discount = Discounts[item.code];

    htmlString.push(`
    <li data-price="${item.price}" class="${styleClass}">${item.name}
      <small>${discount ? discount.description : ''}</small>
      <button id="${item.code}">Add to cart</button>
    </li>`);
  }
  $list.innerHTML = htmlString.join('');
}

$on(window, 'load', () => {
  WebStore('tiny-store');
  render();
});

