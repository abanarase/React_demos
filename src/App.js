import React from 'react';
import './App.css';
import Graph_two from './components/Graph_two';
import Graph_three from './components/Graph_three';
import Graph_four from './components/Graph_four';
import Graph from './components/Graph';
import {Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

 function App() {
  return (  
  <div>
  <div className="flex-container">
     <div style={{flexGrow: '1'}}><Link to="/Rides"><Button variant="contained" color="primary">Book ride</Button></Link></div>
  </div> 
    
  <div className="flex-container">
  <div style={{flexGrow: '1'}}><Graph/></div>
  <div style={{flexGrow: '1'}}><Graph_two/></div>
</div>
<div className="flex-container">
  <div style={{flexGrow: '1'}}><Graph_three/></div>
  <div style={{flexGrow: '1'}}><Graph_four/></div>
</div>
</div>
     
  );
}

export default App;
