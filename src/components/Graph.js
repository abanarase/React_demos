import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';
import cardata from  '../Data/Cartype.json';
const data = [107, 31, 635, 203, 2, 10, 4, 55, 53, 134, 341, 20];

class Graph extends React.Component {
constructor(props) {
    super(props);
      this.state = {
  
        
  }
  //this.filterFunction=this.filterFunction.bind();
  } 
  
 
 options = {
  chart: {
    type: 'column',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    min: 0,
    max: 11
  },
  series: [{
    data: data
  }, { 
    data: data,
    visible: false,
    showInLegend: false
  }]
}

 filterFunction() {
    let input = this.props.month;
    console.log("input",this.props.month);
     if(input!= null){
      console.log(input.value); 
    }
 }


   
  componentDidMount() {
    this.instance = Highcharts.chart("carmod", this.options);
//    this.filterFunction();

  }

  render() {
     this.filterFunction();

    return (
      <div>

        <div id="carmod" className="barchart"/>
      </div>
    );
  }
}

export default Graph;