import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./product-slice";

const store = configureStore({
  reducer: { product: ProductSlice },
});

export default store;
