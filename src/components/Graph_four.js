import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';



class Graph_four extends React.Component {
    // options = {
    //     chart: {
    //       type: "bar"
    //     },
    //     yAxis : {
    //       title: {
    //          text: 'Demand'
    //       }
    //     },
    //     xAxis : {
    //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //    },
      
    //     title: {
    //       text: "Car Color Vs Demand"
    //     },
    //     series :  [{
    //       name: 'Red',
    //       color : 'Red',
    //       data: [{y:7, color: 'red'},{y: 3, color: 'red'},{y: 84, color: 'red'}]
    //    }, 
    //    {
    //       name: 'lightgray',
    //       color: 'lightgray',
    //       data: [{y: 3, color: 'lightgray'},{y: 2, color: 'lightgray'},{y: 8, color: 'lightgray'}]
    //    }, 
    //    {
    //       name: 'black',
    //     color: 'black',
    //       data: [{y: 7, color: 'black'},{y: 63, color: 'black'},{y: 94, color: 'black'}]
    //    }, 
    //    {
    //       name: 'blue',
    //       color: 'blue',
    //       data: [{y: 24, color: 'blue'},{y: 34, color: 'blue'},{y: 8, color: 'blue'}]
    //    }
    // ]
    //   };
    
   options = {
     colors: ['#000', 'blue', 'Red', 'Silver','Yellow'],

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
            ['blue',     26.6],
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