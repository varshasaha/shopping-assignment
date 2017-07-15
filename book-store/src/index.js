import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,Switch,Route,Router} from 'react-router-dom';

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
            <a key={props.value.id} href={descUrl} className="imageClick">
                <img src={imgSrc}/>
                <img className="addToCart" src="/images/cart.png" onClick={(e) => {e.preventDefault();e.stopPropagation();props.addToCart()}}/>
            </a>
        );
}

/**
 * Control displaying of books
 */
class DisplayBooks extends React.Component{
    render(){
        const images = this.props.books.map((book) => {
            return <Book value={book} addToCart={() => {this.props.addToCart(book)}}/>;
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

/**
 * when user checks out
 */
class Checkout extends React.Component{
    render(){
        console.log("items:",this.props);
        return (
            <div>
                {this.props.items}
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
    console.log("header");
    return (
        <header className="mainHeader">
            <span>Book Store</span>
            <a href="/checkout"><img src="/images/cart.png"  className="cart"/><span className="cartItems">{props.items.length}</span></a>
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
        console.log("cart:",cart);
        return (
            <div>
          <Header items={cart}/>
                <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => (<DisplayBooks books={this.props.books} addToCart={(book) => this.props.addToCart(book)}/>)}/>
                    <Route exact path='/home' render={() => (<DisplayBooks books={this.props.books} addToCart={(book) => this.props.addToCart(book)}/>)}/>
                    <Route exact path='/description/:id' component={Description}/>
                    <Route exact path='/checkout' render={() => (<Checkout items={this.props.cart}/>)}/>
                </Switch>
                </BrowserRouter>
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
        this.setState({
            cart: cart.concat([book])
        });
    }

    render(){
        return (
            <Home addToCart={(book) => this.addToCart(book)} books={this.state.books} cart={this.state.cart}/>
        );
    }
}

ReactDOM.render((
        <App />
),
    document.getElementById('root'));
