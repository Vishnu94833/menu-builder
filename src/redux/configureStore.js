import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

import thunk from 'redux-thunk';
import { Feedback } from './feedback';
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            feedBack:Feedback
        }),
        composeWithDevTools(
            applyMiddleware(thunk,logger)
            // other store enhancers if any
          )
        
    );

    return store;
}