import { combineReducers } from 'redux'
import productList from './product'
import cart from './cart'

const rootReducer = combineReducers({
    productList, cart
});

export default rootReducer