import {qs, $on, $delegate} from './helpers'

/**
 * View that abstracts away the browser's DOM completely.
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a todo application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 */
export default class View {
  constructor(template) {
    this.template = template;
    this.$list = qs('.products-list');
    this.$cart = qs('.cart ul');
    this.$total = qs('.cart .total');
    this.$clear = qs('.cart .clear');
  }

  render(viewCmd, parameter) {
    var viewCommands = {
      showCart: () => {
        if (parameter && parameter.length) {
          this.$cart.innerHTML = this.template.show(parameter);
        }
        else {
          this.$cart.innerHTML = '<li>Nothing yet</li>';
          this.$clear.style.display = 'none';
          this.$total.innerHTML = '';
        }
      },

      showTotal: () => this.$total.innerHTML = `Total: ${parameter} &pound;`,

      showClear: () => this.$clear.style.display = parameter ? 'block' : 'none'
    }

    viewCommands[viewCmd]();
  }

  bind(event, handler) {
    if (event === 'addItem') {
      $delegate(this.$list, 'button', 'click', function () {
        handler(this.id)
      });

    } else if (event === 'clearCart') {
      $on(this.$clear, 'click', () => handler());
    }
  }
}
