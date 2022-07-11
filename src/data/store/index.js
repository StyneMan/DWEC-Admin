import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import cmsReducer from "./slice/cms";
import ordersReducer from "./slice/orders";
import productsReducer from "./slice/products";
import supportReducer from "./slice/support";
import categoryReducer from "./slice/category";
import deliveryReducer from "./slice/deliveries";
import suppliersReducer from "./slice/suppliers";
import stocksReducer from "./slice/stocks";
import salesReducer from "./slice/sales";
import proofsReducer from "./slice/proofs";

export default configureStore({
  reducer: {
    cms: cmsReducer,
    user: userReducer,
    sales: salesReducer,
    orders: ordersReducer,
    stocks: stocksReducer,
    proofs: proofsReducer,
    supports: supportReducer,
    products: productsReducer,
    category: categoryReducer,
    delivery: deliveryReducer,
    suppliers: suppliersReducer,
  },
});
