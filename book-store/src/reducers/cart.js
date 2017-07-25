import * as ActionTypes from '../constants/ActionTypes';

var initialCart = {
    items: [],
    threshold: 10
};

export default function cart(state=initialCart,action){
    var updated_items = state.items.slice();
    function shoppingLimit(items,limit){
        if(items.length>0){
            var count = items.reduce((total, item) => ({quantity: total.quantity + item.quantity}));
            if (count.quantity < limit) {
                return 0;
            }
            return 1;
        }
        return 0;
    }
    switch (action.type){
        case ActionTypes.ADD_PRODUCT:
                if(!shoppingLimit(state.items,state.threshold) && action.product.quantity !== 0) {
                    action.product.quantity -= 1;
                    var productNewQuantity = Object.assign({},action.product);
                    productNewQuantity.quantity = 1;
                    var index = updated_items.findIndex((item) => (item.id === action.product.id));
                    if(index !== -1){
                        updated_items[index].quantity += 1;
                    }
                    else{
                        updated_items = updated_items.concat([productNewQuantity]);
                    }
                    state = {
                        items: updated_items,
                        threshold: 10
                    }
                }
            return state;
        case ActionTypes.REMOVE_PRODUCT:
            updated_items.splice(updated_items.findIndex((item) => (item.id === action.product.id)),1);
            state ={
                items: updated_items,
                threshold: 10
            };
            return state;
        case ActionTypes.CHANGE_QUANTITY:
            updated_items[updated_items.findIndex((item) => (item.id === action.product.id))].quantity = Number(action.quantity);
            state ={
                items: updated_items,
                threshold: 10
            };
            return state;
        default:
            return state;

    }
}