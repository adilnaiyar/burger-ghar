import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers ,compose} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import foodReducer from './Store/reducer/food';
import orderReducer from './Store/reducer/order';
import authReducer from './Store/reducer/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  foodItems: foodReducer,
  orderItems: orderReducer,
  auth: authReducer
  
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store = {store}>
    <BrowserRouter basepath = "/burger-ghar">
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
