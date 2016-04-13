export default Template;

/**
* Sets up defaults for all the Template methods such as a default template
*
* @constructor
*/
function Template() {

  this.cartTemplate = `
  <li>
    {{name}} <small>({{quantity}})</small>
  </li>`;
}

/**
 * Creates an <li> HTML string and returns it for placement in your app.
 *
 * @param {object} data The object containing keys you want to find in the
 *                      template to replace.
 * @returns {string} HTML String of an <li> element
 *
 * @example
 * view.show({
 *  id: 1,
 *  title: "Hello World",
 *  completed: 0,
 * });
 */
Template.prototype.show = function(cart) {
  let i, l, template, view = '';

  for (i = 0, l = cart.length; i < l; i++) {
    template = this.cartTemplate;

    template = template.replace('{{name}}', cart[i].name)
    template = template.replace('{{quantity}}', cart[i].quantity);

    view = view + template;
  }

  return view;
};

