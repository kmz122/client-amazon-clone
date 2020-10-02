export const state = () => ({
  //State
  cart: [],
  cartLength: 0,
  shippingPrice: 0,
  shippingEstimatedDelivery: ""
});

export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);

    if (!cartProduct) {
      commit("pushProductToCart", product);
    } else {
      commit("incrementProductQty", cartProduct);
    }

    commit("incrementCartLength");
  }
};

export const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1; // add "quantity" attribute to the product obj
    state.cart.push(product);
  },

  incrementProductQty(state, product) {
    product.quantity++;
    let indexOfProduct = state.cart.indexOf(product); // cart = ["a", "product", "c"]
    state.cart.splice(indexOfProduct, 1, product);
  },

  incrementCartLength(state) {
    state.cartLength = 0; // whenever run this mutation state.cartLength will be reverted back to zero

    if (state.cart.length > 0) {
      // and then cal state.cartLength
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },

  /*
  Change product quantity mutation
  1. Find the product in the cart
  2. Change the quantity of the product
  3. Update the length of the cart 
  4. Replce the old product with the update product
  */
  // changeQty(state, { product, qty }) {
  //   let cartProduct = state.cart.find(prod => prod._id === product._id);
  //   cartProduct.quantity = qty;

  //   state.cartLength = 0;
  //   if (state.cart.length > 0) {
  //     state.cart.map(product => {
  //       state.cartLength += product.quantity;
  //     });
  //   }

  //   let indexOfProduct = state.cart.indexOf("cartProduct");
  //   state.cart.splice(indexOfProduct, 1, cartProduct);
  // }

  changeQty(state, { product, qty }) {
    const cart_product = state.cart.find(prod => prod._id === product._id);
    cart_product.quantity = qty;

    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }

    let indexOfProduct = state.cart.indexOf(cart_product);
    state.cart.splice(indexOfProduct, 1, cart_product);
  },

  /*
  1. Remove the product.quantity from the cartLength
  2. Get the index of the product we want to delete
  3. remove the product by using splice from the cart[]
  */
  deleteProduct(state, product) {
    // let delProduct = state.cart.find(prod => prod._id === product._id);

    // state.cartLength -= delProduct.quantity;
    state.cartLength -= product.quantity;

    // state.cart.splice(state.cart.indexOf(delProduct), 1);
    state.cart.splice(state.cart.indexOf(product), 1);
  },

  setShipping(state, { price, estimatedDelivery }) {
    state.shippingPrice = price;
    state.shippingEstimatedDelivery = estimatedDelivery;
  },

  clearCart(state) {
    state.cart = [];
    state.cartLength = 0;
    state.shippingPrice = 0;
    state.shippingEstimatedDelivery = "";
  }
};

export const getters = {
  // to get a state
  getCartLenght(state) {
    return state.cartLength;
  },

  getCart(state) {
    return state.cart;
  },

  getCartTotalPrice(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total;
  },

  getCartLenght(state) {
    return state.cartLength;
  },

  getCartTotalPriceWithShipping(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total + state.shippingPrice;
  },

  getEstimatedDelivery(state) {
    return state.shippingEstimatedDelivery;
  },

  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  }
};
