import * as ActionTypes from '../constants/ActionTypes';

var stock = [
    {
        id: '1',
        name: 'book1',
        description: 'description',
        quantity: 5
    },
    {
        id: '2',
        name: 'book2',
        description: 'description',
        quantity: 5
    },
    {
        id: '3',
        name: 'book3',
        description: 'description',
        quantity: 10
    },
    {
        id: '4',
        name: 'book4',
        description: 'description',
        quantity: 5
    },
    {
        id: '5',
        name: 'book5',
        description: 'description',
        quantity: 5
    },
    {
        id: '6',
        name: 'book6',
        description: 'description',
        quantity: 5
    },
    {
        id: '7',
        name: 'book7',
        description: 'description',
        quantity: 5
    },
    {
        id: '8',
        name: 'book8',
        description: 'description',
        quantity: 5
    },
    {
        id: '9',
        name: 'book9',
        description: 'description',
        quantity: 5
    },
    {
        id: '10',
        name: 'book10',
        description: 'description',
        quantity: 5
    }
];

var products = {
    books: stock,
    searchStr: ''
};

export default function productList(state = products, action){
    switch (action.type){
        case ActionTypes.SEARCH_PRODUCT:
            return Object.assign({},state,{items: stock.filter((item) => (item.name.includes(action.value))),searchStr: action.value});
        default :
            return state;
    }
}

