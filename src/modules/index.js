import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import homeReducer from './home'

export default combineReducers({
    routing: routerReducer,
    homeReducer
})