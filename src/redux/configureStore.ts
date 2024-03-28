import { Tuple, configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from "redux-thunk";
import { Comments } from "./comments";
import { Dishes } from "./dishes";
import { Feedback } from "./feedback";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
  const storeReducer = 
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      feedBack: Feedback,
    });

  const store = configureStore({
    reducer: storeReducer,
    middleware: () => new Tuple(thunk),
  })

  return store;
};
