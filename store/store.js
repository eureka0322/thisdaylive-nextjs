import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ["account"],
  storage,
}
import { configureStore } from "@reduxjs/toolkit";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer)

// creating store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: middleware,
});

export const persistor = persistStore(store)

// assigning store to next wrapper
const makeStore = () => persistor;

export const wrapper = createWrapper(makeStore);