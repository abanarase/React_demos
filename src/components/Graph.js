import React , { PureComponent } from 'react';
import Highcharts from 'highcharts';
import './Graph.css';
import cardata from  '../Data/Cartype.json';
import Select from 'react-select';


const Yearly= [
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' }

]

class Graph extends PureComponent {
instance;
constructor(props) {
    super(props);
      this.state = {
         selectedOption:null,
         
  }
  this.handleChange=this.handleChange.bind();
  
  } 

 handleChange = selectedOption => {
    this.setState({ selectedOption });    
   let year = selectedOption.value;
   let Dataitem = cardata.filter((item) => {
  return item.Year === parseInt(year);
  });
    let temp = Dataitem[0].item;
    let models =[]
  
   for(let i=0; i<temp.length ;i++){
    models.push(temp[i]);
   }

Highcharts.charts.forEach((chart) => {
    if (chart.renderTo.id === 'carmod') {
    chart.update({
      series:models
    }, true);    
    chart.redraw();
  }
  });
  };
 
 options = {
  chart: {
    type: 'column',
  },
  yAxis : {
      title: {
         text: 'Demand'
      }
    },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    min: 0,
    max: 11
  },
  title: {
      text: "Car model VS Demand"
    },
    
  series: [
         {
            "name": "Sedan",
            "data": [11,32,36,8,9,56,34,12,67,6,43,11]
         },
         {
            "name": "hatchback",
            "data": [11,32,36,8,9,56,34,12,67,6,43,11]
         },
         {
            "name": "MPV",
            "data":[11,32,36,8,9,56,34,12,67,6,43,11]
         },
         {
            "name": "SUV",
            "data": [11,32,36,8,9,56,34,12,67,6,43,11]
         }
      ]
}
  
  componentDidMount() {
    this.instance = Highcharts.chart("carmod", this.options);
  }

  render() {

 const { selectedOption } = this.state;
    return (
      <div style={{backgroundColor:"#fffcfc"}}>
        <div className="flex-container_graph">
    
      <div><Select placeholder="select year" options={Yearly} value={selectedOption}  defaultValue={{value: '2020', label: '2020'}} onChange={this.handleChange}/></div>
    <div style={{flexGrow:'1'}}><div id="carmod"  className="barchart"/></div>
      </div> 
        
      
      </div>
    );
  }
}

export default Graph;  