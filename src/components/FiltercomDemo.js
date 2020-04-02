import React from 'react';
import Highcharts from 'highcharts';
import './Graph.css';

import Select from 'react-select';
const data = [107, 31, 635, 203, 2, 10, 4, 55, 53, 134, 341, 20];
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
class FilterComponent extends React.Component {
constructor(props) {
  
    super(props);
    this.state = {
    selectedOption: null,
  };
     //this.filterFunction=this.filterFunction.bind();
  this.handleChange=this.handleChange.bind();
  } 
  
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);


   let month = selectedOption.value;
   console.log("month is",month);
   //let points = Highcharts.charts.series[0];
  var monthsArr = Highcharts.defaultOptions.lang.shortMonths;
   console.log("monthsArr",monthsArr);
  var monthIndex = monthsArr.indexOf(month);
  console.log("monthIndex",monthIndex);
  var datas = [];
  var cat = [];
  cat.push(month);
  console.log("cat",cat);

  console.log(data);

  for(let i=0;i <= data.length;i++){
    if(i == monthIndex){
      datas.push(data[monthIndex]);
    }
    else{
      datas.push(null);
    }
    
  }
console.log(datas);

Highcharts.charts.forEach((chart) => {
    chart.series[1].update({
      data:cat
    })
    chart.series[0].update({
      data: datas
    }, false, false, false);

    chart.redraw();
  });
  };
 
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

  
componentDidMount() {
    this.instance = Highcharts.chart("carmod", this.options)

  }
  render() {  
  const { selectedOption } = this.state;  
    return (
      <div>
      <div style={{flexGrow:'1'}}><Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      /></div>
 
     
        <div id="carmod" className="barchart"/>
      </div>
    );
  }
}

export default FilterComponent;