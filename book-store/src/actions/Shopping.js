import * as ActionTypes from '../constants/ActionTypes';

export function addProduct(product){
    return {type: ActionTypes.ADD_PRODUCT,product};
}

export function removeProduct(product){
    return {type: ActionTypes.REMOVE_PRODUCT, product};
}

export function changeQuantity(product,quantity){
    return {type: ActionTypes.CHANGE_QUANTITY, product, quantity};
}

export function onSearch(searchStr){
    return {type: ActionTypes.SEARCH_PRODUCT, value: searchStr};
}