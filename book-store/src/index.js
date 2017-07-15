import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';

/**
 *return html for each book to be displaed on home page
 *
 * @param props
 * @returns {XML}
 * @constructor
 */

function Book(props){
        let imgSrc = "/images/" + props.value.name + ".jpg";
        let descUrl = "/description/" + props.value.id;
        return (
            <Link key={props.value.id} to={descUrl} className="imageClick">
                <img src={imgSrc} className="product" alt="Unable to load"/>
                <img className="addToCart" alt="Unable to load" src="/images/cart.png" onClick={(e) => {e.preventDefault();e.stopPropagation();props.addToCart()}}/>
            </Link>
        );
}

/**
 * Control displaying of books
 */
class DisplayBooks extends React.Component{
    render(){
        const images = this.props.books.map((book) => {
            return <Book key={book.id} value={book} addToCart={() => {this.props.addToCart(book)}}/>;
        });
        return (
            <div>
                {images}
            </div>
        );
    }
}

/**
 * Description page of each book
 */
class Description extends React.Component{
    render(){
        return (
            <div>
                {this.props.match.params.id}
            </div>
        );
    }

}

function CheckoutItem(props){
    let imgSrc = "/images/" + props.item.name + ".jpg";
    return (
        <div className="checkoutItem" >
            <img src={imgSrc} alt="Unable to load"/><span>X</span><input type="text"  defaultValue={props.item.quantity} onChange={(e) => {props.changeQuantity(props.item,e.target.value)}}/>
        </div>
    );
}

/**
 * when user checks out
 */
class Checkout extends React.Component{
    render(){
        const items = this.props.items.map((item) => {
           return <CheckoutItem key={item.id} item={item} changeQuantity={(book,value) => this.props.changeQuantity(book,value)}/>
        });
        return (
            <div>
                {items}
            </div>
        );
    }

}

/**
 * Header of page
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
function Header(props){
    var numberOfItems = 0;
    if(props.items.length>0) {
        numberOfItems = props.items.reduce((total, item) => ({quantity : total.quantity + item.quantity}));
    }
    return (
        <header className="mainHeader">
            <span>Book Store</span>
            <Link to="/checkout"><img src="/images/cart.png"  alt="Unable to load" className="cart"/><span className="cartItems">{numberOfItems.quantity}</span></Link>
        </header>
    );
}

/**
 * Home page
 */
class Home extends React.Component{
    render(){
        const books = this.props.books;
        const cart = this.props.cart;
        return (
            <div>
                <Switch>
                    <Route exact path='/' render={() => (<DisplayBooks books={books} addToCart={(book) => this.props.addToCart(book)}/>)}/>
                    <Route path='/products' render={() => (<DisplayBooks books={books} addToCart={(book) => this.props.addToCart(book)}/>)}/>
                    <Route path='/description/:id' component={Description}/>
                    <Route path='/checkout' render={() => (<Checkout items={cart} changeQuantity={(book,value) => this.props.changeQuantity(book,value)}/>)}/>
                </Switch>
            </div>
        );
    }
}

/**
 * Main Component
 */
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            cart: [],
            books: [
                {
                    id: '1',
                    name: 'book1',
                    description: 'description'
                },
                {
                    id: '2',
                    name: 'book2',
                    description: 'description'
                },
                {
                    id: '3',
                    name: 'book3',
                    description: 'description'
                },
                {
                    id: '4',
                    name: 'book4',
                    description: 'description'
                },
                {
                    id: '5',
                    name: 'book5',
                    description: 'description'
                },
                {
                    id: '6',
                    name: 'book6',
                    description: 'description'
                },
                {
                    id: '7',
                    name: 'book7',
                    description: 'description'
                },
                {
                    id: '8',
                    name: 'book8',
                    description: 'description'
                },
                {
                    id: '9',
                    name: 'book9',
                    description: 'description'
                },
                {
                    id: '10',
                    name: 'book10',
                    description: 'description'
                }
            ]
        }
    };

    addToCart(book){
        var cart = this.state.cart;
        var bookWithQuantity = Object.assign({},book);
        bookWithQuantity.quantity = 1;
        if(!updateQuantity(cart,bookWithQuantity)){
            this.setState({
                cart: cart.concat([bookWithQuantity])
            });
        }
        else{
            this.setState({
                cart: cart
            });
        }
    }

    changeQuantity(book,value) {
        var cart = this.state.cart;
        value = Number(value);
        updateQuantity(cart, book, value);
        this.setState({
            cart: cart
        });
    }

    render(){
        const cart = this.state.cart;
        const books = this.state.books;
        return (
            <div>
                    <Header items={cart}/>
                    <Home addToCart={(book) => this.addToCart(book)} books={books} cart={cart} changeQuantity={(book,value) => this.changeQuantity(book,value)}/>
            </div>
        );
    }
}

function updateQuantity(arr,item,value){
    var length = arr.length;
    for(let i=0;i<length;i++){
        if(arr[i].id === item.id){
            if(value !== undefined) {
                arr[i].quantity = value;
            }
            else{
                arr[i].quantity += item.quantity;
            }
            return 1;
        }
    }
    return 0;
}

ReactDOM.render((
    <BrowserRouter history={createBrowserHistory()}>
        <App />
    </BrowserRouter>

    ),
    document.getElementById('root'));