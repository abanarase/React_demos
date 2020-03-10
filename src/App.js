import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph_two from './components/Graph_two';
import Graph_three from './components/Graph_three';
import Graph_four from './components/Graph_four';
import Graph from './components/Graph';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

 function App() {
  return (
    <div className="App">   
     <Link to="/Rides"><input className="Erra" type="button" value="Book ride"/></Link>  
     {/* <Link to="/Cars"><input className="Erra" type="button" value="Book ride car"/></Link>   */}
     <div>   
    <div className ="firstdiv"> 
    <Graph />
     <Graph_two />
    </div> 
    <div className ="firstdiv">
    <Graph_three />
      <Graph_four />
    </div> 
    </div>
      
      </div>
      
  );
}

export default App;
