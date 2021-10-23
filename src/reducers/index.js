import { combineReducers } from "redux";

import date from "./dateReducer";

const appReducer = combineReducers({ date });

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
