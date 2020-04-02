import React,{PureComponent}from 'react';
import './App.css';
import Graph_two from './components/Graph_two';
import Graph_three from './components/Graph_three';
import Graph_four from './components/Graph_four';
import Graph from './components/Graph';
import Select from 'react-select';
import {Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
const  {selectedOption}={ value: 'jan', label: 'January' };
const options = [
  { value: 'Jan', label: 'jan' },
  { value: 'Feb', label: 'feb' },
  { value: 'Mar', label: 'march' },
  {value:'Apr',label:'Apr'},
  {value:'May',label:'May'},
  {value:'Jun',label:'Jun'},
  {value:'Jul',label:'Jul'},
  {value:'Aug',label:'Aug'},
  {value:'Sep',label:'Sep'},
  {value:'Oct',label:'Oct'},
  {value:'Nov',label:'Nov'},
  {value:'Dec',label:'Dec'}
];
const options2 = [
  { value: 'q1', label: 'Quarter1' },
  { value: 'q2', label: 'Quarter2' },
  { value: 'q3', label: 'Quarter3' }
]
const options3= [
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' }

]
 class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedOption:null,
      
  };
  this.handleChange = this.handleChange.bind(this);
}

//   handleChange = selectedOption => {
//     let mon = selectedOption.value;
    
//     this.setState({month:mon});
// //this.setState({ selectedOption});

// console.log(`Option selected:`,this.state.month);
// }; 

handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);


   let month = selectedOption.value;
   console.log("month is",month);
  }

render() {
  const { selectedOption } = this.state;
  let k =this.state.selectedOption;
  console.log("ss",k);

  return (  
  <div>
  <div className="flex-container_one">
     {/* <div style={{flexGrow:'1'}}><Select options={options} onChange={this.handleChange} value={selectedOption}/></div> */}
 <div style={{flexGrow:'1'}}><Select  options={options}/></div> 
     <div style={{flexGrow:'1'}}><Select options={options2} /></div>
     <div style={{flexGrow:'1'}}><Select value={selectedOption}
        onChange={this.handleChange}
        options={options3}
      /></div>
     <div style={{flexGrow: '1'}}><Link to="/Rides"><Button variant="contained" color="primary">Book ride</Button></Link></div>
  </div> 
    
  <div className="flex-container">
  <div style={{flexGrow: '1'}}><Graph month={k}/></div>
  <div style={{flexGrow: '1'}}><Graph_two/></div>
</div>
<div className="flex-container">
  <div style={{flexGrow: '1'}}><Graph_three/></div>
  <div style={{flexGrow: '1'}}><Graph_four/></div>
</div>
</div>
     
  );
}
}

export default App;
