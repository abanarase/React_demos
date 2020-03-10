import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';

class Graph_two extends React.Component {
  
  options = {
    chart: {
      type: "line"
    },
    yAxis : {
      title: {
         text: 'Demand'
      }
    },
    xAxis : {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   },
  
    title: {
      text: "Car type VS Demand"
    },
    series :  [{
      name: 'Hatchback',
      data: [5, 7, 9 ]
   }, 
   {
      name: 'Sedan',
      data: [14, 10, 15 ]
   }, 
   {
      name: 'MPV',
      data: [25, 10, 76 ]
   }, 
   {
      name: 'SUV',
      data: [55, 34, 54 ]
   }
]
  };

  componentDidMount() {
    this.instance = Highcharts.chart("cartype", this.options);
  }

  render() {
    return (
      <div>
        <div id="cartype" className="barchart"/>
      </div>
    );
  }
}

export default Graph_two;