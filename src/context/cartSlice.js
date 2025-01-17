import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  amount: 1,
  total: 0,
  cartItems: [],
  loading: false,
  tax: 0.0075,
  error: null,
  pending: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cartItems.push(payload);
    },
    updateStart: state => {
      state.loading = true;
    },
    getCart: state => {
      const user = JSON.parse(localStorage.getItem('fresh_grub_cart'));
      state.currentUser = user;
    },
    onError: (state, { payload }) => {
      state.error = { message: payload, error: true };
      state.loading = false;
    },
    onSuccess: state => {
      state.loading = false;
      state.error = false;
    },
    setCartItem: (state, { payload }) => {
      state.cartItems.push(payload);
    },
    removeCartItem: (state, { payload }) => {
      const newCart = state.cartItems.filter(
        cartItem => cartItem.$id !== payload
      );
      state.cartItems = newCart;
    },
    increase: (state, { payload }) => {
      const newCart = state.cartItems.map(cartItem => {
        if (cartItem.$id === payload) {
          cartItem.amount += 1;
          return cartItem;
        }
        return cartItem;
      });
      state.cartItems = newCart;
    },
    decrease: (state, { payload }) => {
      const newCart = state.cartItems.map(cartItem => {
        if (cartItem.$id === payload) {
          cartItem.amount -= 1;
          return cartItem;
        }
        return cartItem;
      });
      state.cartItems = newCart;
    },
    getCartTotal: state => {
      const { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const cartItemCost = cartItem.price * cartItem.amount;
          cartTotal.total += cartItemCost;
          cartTotal.amount += cartItem.amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      state.amount = amount;
      state.total = parseFloat(total.toFixed(2));
      localStorage.setItem('fresh_grub_cart', JSON.stringify(state));
    },
    clearCart: state => {
      console.log('clear cart called');
      state.amount = 0;
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  increase,
  decrease,
  getCartTotal,
  setCartItem,
  clearCart,
  getCart,
} = cartSlice.actions;
export default cartSlice.reducer;
