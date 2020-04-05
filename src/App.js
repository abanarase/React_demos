import React from 'react';
import './App.css';
import GraphTwo from './components/GraphTwo';
import GraphThree from './components/GraphThree';
import GraphFour from './components/GraphFour';
import Graph from './components/Graph';
import {Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

 class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedOption:null      
  };
  
}


render() {
  
  return (  
  <div>
  <div className="flex-container_one">     
     <div style={{flexGrow: '1'}}><Link to="/Rides"><Button variant="contained" color="primary">Book ride</Button></Link></div>
  </div> 
    
  <div className="flex-container">
  <div style={{flexGrow: '1'}}><Graph/></div>
  <div style={{flexGrow: '1'}}><GraphTwo/></div>
</div>
<div className="flex-container">
  <div style={{flexGrow: '1'}}><GraphThree/></div>
  <div style={{flexGrow: '1'}}><GraphFour/></div>
</div>
</div>
     
  );
}
}

export default App;
