import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,Switch,Route,Router} from 'react-router-dom';


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

class Description extends React.Component{
    render(){
        return (
            <div>
                {this.props.match.params.id}
            </div>
        );
    }

}

class Checkout extends React.Component{
    render(){
        return (
            <div>
                {this.props}
            </div>
        );
    }

}

function Header(props){
    const checkoutUrl = "/checkout/"+props.items;
    return (
        <header className="mainHeader">
            <span>Book Store</span>
            <a href={checkoutUrl}><img src="/images/cart.png"  className="cart"/><span>{props.items.length}</span></a>
        </header>
    );
}

class App extends React.Component{
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
    }

    addToCart(book){
        var cart = this.state.cart;
        this.setState({
                cart: cart.concat([book])
        });
    }

    render(){
        const books = this.state.books;
        const cart = this.state.cart;
        return (
            <div>
          <Header items={cart}/>
                <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => (<DisplayBooks books={this.state.books} addToCart={(book) => this.addToCart(book)}/>)}/>
                    <Route path='/home' render={() => (<DisplayBooks books={this.state.books} addToCart={(book) => this.addToCart(book)}/>)}/>
                    <Route path='/description/:id' component={Description}/>
                    <Route path='/checkout/:items' render={() => (<Checkout />)}/>
                </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render((
        <App />
),
    document.getElementById('root'));
