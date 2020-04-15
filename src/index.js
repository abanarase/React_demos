import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Rides from './components/Riding';
import Cars from './components/CarListing';
import Users from './components/UserList';
import BookingForm from './components/BookingForm';
import {CarProvider} from './Context/CarContext';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const routing = (
  <CarProvider>
    <Router>
    <div id="menu-outer">    
     <Link to="/"><input className="Erra2" type="button" value="Home"/></Link>
   
     <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Rides" component={Rides} />
        <Route path="/Cars" component={Cars} />
        <Route path="/Users" component={Users}/>
        <Route path="/BookingForm" component={BookingForm} />
      </Switch>
    </div>
    </Router>
    </CarProvider>
)
ReactDOM.render(routing,document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
