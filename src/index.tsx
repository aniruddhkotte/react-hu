import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import CheckoutPage from './pages/CheckoutPage/checkoutPage';
import ProfilePage from './pages/ProfilePage/profilePage';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/checkout" component={CheckoutPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
