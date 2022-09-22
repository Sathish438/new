import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    cartItems: [],
    totalQuantity: 0,
  },
  reducers: {
    setProducts(state, action) {
      state.items = [];
      state.items.push(...action.payload);
    },
    setCart(state, action) {
      state.cartItems = [...action.payload.cartItems];
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      const newProduct = action.payload;
      const currentItems = state.cartItems;
      const existingItem = currentItems?.find(
        (item) => item.id === action.payload.id
      );
      // const existingItemIndex = currentItems.findIndex(item => item.id === action.payload.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          ...action.payload,
          totalPrice: action.payload.price,
          qty: 1,
        });
      } else {
        existingItem.totalPrice = +existingItem.totalPrice + +newProduct.price;
        existingItem.qty++;
      }
    },
    removeFromCart(state, action) {
      const newProduct = action.payload;
      const currentItems = state.cartItems;
      state.totalQuantity--;
      const existingItem = currentItems.find(
        (item) => item.id === newProduct.id
      );
      if (+existingItem.qty === 1) {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== newProduct.id
        );
      } else {
        existingItem.totalPrice = +existingItem.totalPrice - +newProduct.price;
        existingItem.qty--;
      }
    },
  },
});

export const { setProducts, addToCart, removeFromCart, setCart } =
  ProductSlice.actions;

export default ProductSlice.reducer;
