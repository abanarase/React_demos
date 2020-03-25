import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';



class Graph_four extends React.Component {
        
   options = {
     colors: ['#000', 'DarkBlue', 'tomato', 'Silver','Yellow'],

    chart: {
        type: 'pie'
    },

    title: {
        text: 'Car Demandvs color'
    },

    plotOptions: {
        pie: {
            startAngle: 90
        }
    },
    series: [{
        data: [
            ['black', 44.2],
            ['Blue',     26.6],
            ['Red',     20],
            ['Silver',  3.1],
            ['Other',   5.4]
        ]
    }]
};

      componentDidMount() {
        this.instance = Highcharts.chart("carcol", this.options);
      }
    
      render() {
        return (
          <div>
            <div id="carcol" className="barchart"/>
          </div>
        );
      }
    }
export default Graph_four;