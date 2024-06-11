import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import authReducer from './authSlice'; 

const rootReducer = combineReducers({
    game: gameReducer,
    auth: authReducer,

});

export default rootReducer;
