import { combineReducers } from "redux";

import date from "./dateReducer";
import settings from "./settingsReducer";

const appReducer = combineReducers({ date, settings });

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
