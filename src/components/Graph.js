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
const Quartely = [
  { value: 'q1', label: 'Quarter1' },
  { value: 'q2', label: 'Quarter2' },
  { value: 'q3', label: 'Quarter3' },
  { value: 'q4', label: 'Quarter4' }
]

class Graph extends PureComponent {
instance;
constructor(props) {
    super(props);
      this.state = {
         selectedOption:null,
         filterOption: null
         
  }
  this.handleChange=this.handleChange.bind();
  this.optionSelected=this.optionSelected.bind();
  this.chartUpdate=this.chartUpdate.bind();
  
  } 

  optionSelected = filterOption => {    
    this.setState({
      filterOption
    })
    let year = this.state.selectedOption.value;
    let result = cardata.filter((item) => {
  return item.Year === parseInt(year)  ;
  });
    let res;
    let cat=[];
   if(filterOption.value == "q1"){
    res = result[0].q1;
    cat=["Jan","feb","march"];
   }
   else if(filterOption.value == "q2"){
    res = result[0].q2;
   cat=["April","May","June"];  
   }
   else if(filterOption.value == "q3"){
    res = result[0].q3;
    cat=["Jully","Aug","Sep"];  
   }
   else if(filterOption.value == "q4"){
    res = result[0].q4;
   cat=["Oct","Nov","Dec"];  
   }
   this.chartUpdate(res,cat);
  }

chartUpdate(res,cat) {
  Highcharts.charts.forEach((chart) => {
    if (chart.renderTo.id === 'carmod') {
    chart.update({
      series:res
    }, true);
    chart.xAxis[0].update({
      categories:cat
    })    
    chart.redraw();
  }
  });
}
 handleChange = selectedOption => {
  this.setState({filterOption:''});
    this.setState({ selectedOption });    
   let year = selectedOption.value;
   let Dataitem = cardata.filter((item) => {
  return item.Year === parseInt(year);
  });
    let temp = Dataitem[0].item;
    let models =[]
    let cat = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
   for(let i=0; i<temp.length ;i++){
    models.push(temp[i]);
   }
this.chartUpdate(models,cat);
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
 const {filterOption} =this.state;
    return (
      <>
      <div style={{backgroundColor:"#fffcfc"}}>
        <div className="flex-container_graph">
    
      <div style={{flexGrow:'1'}} ><Select placeholder="select year" options={Yearly} value={selectedOption}  defaultValue={{value: '2020', label: '2020'}} onChange={this.handleChange}/></div>
     <div style={{flexGrow:'1'}}><Select  options={Quartely} value={filterOption} onChange={this.optionSelected}/></div>     
     
      </div> 
        
      <div id="carmod"  className="barchart"/></div>
      
      </>
    );
  }
}

export default Graph;  