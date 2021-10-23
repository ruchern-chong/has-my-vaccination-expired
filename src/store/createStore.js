import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createLogger } from "redux-logger";

import rootReducer from "../reducers";

const initialState = {};
const middlewares = [];

const persistConfig = {
  key: "settings",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  collapsed: true,
});

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export default () => ({ store, persistor });
