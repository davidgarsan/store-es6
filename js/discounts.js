const Discounts = {

  'FR1': {
    description: 'Buy one and get another free!',

    deal (item, price) {
      return (Math.ceil(item.quantity / 2) || 1) * price;
    }
  },

  'SR1': {
    description: 'Buy three of more and get it for special price, 4.5 &pound;!',

    deal (item, price) {
      return (item.quantity >= 3) ? item.quantity * 4.5 : item.quantity * price;
    }
  }

};

export default Discounts;
