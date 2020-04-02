import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Filter from './components/FilterComponent'
import * as serviceWorker from './serviceWorker';
import Rides from './components/Riding';
import Cars from './components/Car_listing';
import Booking_form from './components/Booking_form';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
      <header></header>
    <div id="menu-outer">    
     <Link to="/"><input className="Erra2" type="button" value="Home"/></Link>
   
     <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Rides" component={Rides} />
        <Route path="/Cars" component={Cars} />
        <Route path="/Booking_form" component={Booking_form} />
      </Switch>
    </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
