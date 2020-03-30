import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';

class Graph extends React.Component {
  
  options = {
    chart: {
      type: "column"
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
      text: "Car Model VS Demand"
    },
    series :  [{
      name: 'Suzuki',
      data: [5, 7, 9, 8,10,12,23]
   }, 
   {
      name: 'Mahindra',
      data: [14, 10, 15,7,2,34,12,22,54,6,8,4]
   }, 
   {
      name: 'Honda',
      data: [25, 10, 76 ]
   }, 
   {
      name: 'Toyota',
      data: [55, 34, 54 ]
   }
]

  };

  componentDidMount() {
    this.instance = Highcharts.chart("carmod", this.options);
  }

  render() {
    return (
      <div>
        <div id="carmod" className="barchart"/>
      </div>
    );
  }
}

export default Graph;