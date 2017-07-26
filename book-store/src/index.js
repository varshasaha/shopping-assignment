import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';


ReactDOM.render(
    <Provider>
        <BrowserRouter>
           <Route path='/' component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
