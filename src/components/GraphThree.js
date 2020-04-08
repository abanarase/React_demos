import React from 'react';
import Highcharts from 'highcharts';
import './css/Graph.css';

class GraphThree extends React.Component {
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
          text: "Car Transmission vs demand"
        },
        series :  [{
          name: 'Automatic',
          data: [5, 7, 9, 8]
       }, 
       {
          name: 'Manual',
          data: [14, 10, 15,]
       }, 
      
    ]
      };
    
      componentDidMount() {
        this.instance = Highcharts.chart("cartrans", this.options);
      }
    
      render() {
        return (
          <div>
            <div id="cartrans" className="barchart"/>
          </div>
        );
      }
    }

export default GraphThree;
