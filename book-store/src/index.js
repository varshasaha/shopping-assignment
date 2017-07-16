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

function Product(props){
        let imgSrc = "/images/" + props.value.name + ".jpg";
        let descUrl = "/description/" + props.value.id;
        return (
            <Link to={descUrl} className="imageClick">
                <img src={imgSrc} alt="Unable to load"/>
                <img alt="Unable to load" src="/images/cart.png" onClick={(e) => {e.preventDefault();e.stopPropagation();props.addToCart()}}/>
            </Link>
        );
}

/**
 * Control displaying of books
 */
class DisplayProducts extends React.Component{
    render(){
        var timeoutId;
        const images = this.props.books.map((book) => {
            return <Product key={book.id} value={book} addToCart={() => {this.props.addToCart(book)}}/>;
        });

        return (
            <div>
                <div className="searchBox">
                    <input type="text" placeholder="Enter product name to search" onChange = {(e) => {
                                                                var value = e.target.value;
                                                                setTimeout(() => {
                                                                if(timeoutId){
                                                                    clearTimeout(timeoutId)
                                                                }
                                                                timeoutId = this.props.onSearch(value);
                                                                },2000)
                                                            }
                                                   }/>
                </div>
                <div>
                    {images}
                </div>
            </div>
        );
    }
}

/**
 * Description page of each book
 */
class Description extends React.Component{
    render(){
        var book = this.props.getProduct(this.props.match.params.id);
        return (
            <div className="descProduct">
                <div>
                    <Product value={book} addToCart={() => {this.props.addToCart(book)}}/>
                </div>
                <div>
                    <h1>Description</h1>
                    <p>In 1903 Mary Boulton flees alone across the West, one heart-pounding step ahead of the law. At nineteen, she has just become a widow-and her husband's killer. As bloodhounds track her frantic race toward the mountains, she is tormented by mad visions and by the knowledge that her two ruthless brothers-in-law are in pursuit, determined to avenge their younger brother's death. Responding to little more than the primitive instinct for survival at any cost, she retreats ever deeper into the wilderness-and into the wilds of her own mind..</p>
                </div>
            </div>
        );
    }

}

function CheckoutItem(props){
    let imgSrc = "/images/" + props.item.name + ".jpg";
    return (
        <div className="checkoutItem" >
        <div>
                <img src={imgSrc} alt="Unable to load"/>
                <img src="/images/remove.png" alt="Unable to load" className="removeIcon" onClick={() => props.removeProduct(props.item)}/>
        </div>
            <span>X</span>
            <input type="text"  defaultValue={props.item.quantity} onChange={(e) => {props.changeQuantity(props.item,e.target.value)}}/>
        </div>
    );
}

/**
 * when user checks out
 */
class Checkout extends React.Component{
    render(){
        const items = this.props.items.map((item) => {
           return <CheckoutItem key={item.id} item={item} changeQuantity={(book,value) => this.props.changeQuantity(book,value)} removeProduct={(book) => this.props.removeProduct(book)}/>
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
            <Link to="/checkout"><img src="/images/cart.png"  alt="Unable to load" className="cart"/><span>{numberOfItems.quantity}</span></Link>
        </header>
    );
}

/**
 * Home page
 */
class Main extends React.Component{
    render(){
        const books = this.props.books;
        const cart = this.props.cart;
        return (
            <div>
                <Switch>
                    <Route exact path='/' render={() => (<DisplayProducts books={books} addToCart={(book) => this.props.addToCart(book)} onSearch={(searchStr) => this.props.onSearch(searchStr)}/>)}/>
                    <Route path='/products' render={() => (<DisplayProducts books={books} addToCart={(book) => this.props.addToCart(book)} onSearch={(searchStr) => this.props.onSearch(searchStr)}/>)}/>
                    <Route path='/description/:id' render={({match}) => (<Description getProduct={(id) => this.props.getProduct(id)} addToCart={(book) => this.props.addToCart(book)} match={match}/>)}/>
                    <Route path='/checkout' render={() => (<Checkout items={cart} changeQuantity={(book,value) => this.props.changeQuantity(book,value)} removeProduct={(book) => this.props.removeProduct(book)}/>)}/>
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
        this.threshold = 10;
        this.books = [
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
        this.state = {
            cart: [],
            books: this.books
        }
    };

    addToCart(book){
        var cart = this.state.cart;
        var books = this.state.books;
        if(this.limitReached(cart,this.threshold)){
            return;
        }
        if(this.productInStock(book,books)){
            var itemOfIndex = this.state.books.findIndex(item => item.id === book.id);
            books[itemOfIndex].quantity-=1;
        }
        else{
            return;
        }
        var bookWithQuantity = Object.assign({},book);
        bookWithQuantity.quantity = 1;
        if(!updateQuantity(cart,bookWithQuantity)){
            this.setState({
                cart: cart.concat([bookWithQuantity])
            });
        }
        else{
            this.setState({
                cart: cart,
                books: books
            });
        }
    }

    productInStock(product,stock){
        var item = stock.find((item) => (item.id === product.id));
        if(item.quantity == 0){
            return 0;
        }
        return 1;
    }

    limitReached(arr,limit){
        if(arr.length>0) {
            var count = arr.reduce((total, item) => ({quantity: total.quantity + item.quantity}));
            if (count.quantity < limit) {
                return 0;
            }
            return 1;
        }
        return 0;
    }

    changeQuantity(book,value) {
        var cart = this.state.cart;
        value = Number(value);
        updateQuantity(cart, book, value);
        this.setState({
            cart: cart
        });
    }

    removeProduct(book){
        var cart = this.state.cart;
        var index=cart.findIndex((item) => (item.id === book.id));
        cart.splice(index,1);
        this.setState({
            cart: cart
        });
    }

    getProduct(id){
        var books = this.state.books;
        return books.find((item) => (item.id === id));
    }

    onSearch(searchStr){
        var books = this.books;
        books = books.filter((item) => (item.name.includes(searchStr)));
        this.setState({
            books: books
        });
    };

    render(){
        const cart = this.state.cart;
        const books = this.state.books;
        return (
            <div>
                    <Header items={cart}/>
                    <Main addToCart={(book) => this.addToCart(book)} books={books} cart={cart} changeQuantity={(book,value) => this.changeQuantity(book,value)} removeProduct={(book) => this.removeProduct(book)} getProduct={(id) => this.getProduct(id)} onSearch={(searchStr) => this.onSearch(searchStr)}/>
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
    <BrowserRouter histoy={createBrowserHistory()}>
        <App />
    </BrowserRouter>

    ),
    document.getElementById('root'));