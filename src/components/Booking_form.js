import React from 'react';
import './Booking_form.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from  '../Data/Carlist.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "./Table";
const headers = ["Name","Car model","Total Amount","Days"];

class Booking_form extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      cars:data ,
      selectedOption: null,
      name: "",
      email:"",
      address:"",
      Mobile:"",
      license:"",
      ccno:"",
      amt:"",
      dep_amt:"",
      showtab:"hide",
      newdata: "",
      trent:"",
      carmodel:"",
      startDate: new Date(),
      endDate : new Date(),
      fields: {},
      errors: {}        
      };
this.handleChange = this.handleChange.bind(this);
this.cal_fare = this.cal_fare.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);  
}
handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
       console.log("fiels",fields);
        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }  

       this.setState({errors: errors});
       return formIsValid;
   }

handleselChange = selectedOption => {
this.setState({ selectedOption });
console.log(`Option selected:`, selectedOption);
}; 

handleChangeSDate = startDate => {
this.setState({startDate });
console.log("start",startDate);
};

handleChangeEDate = endDate => {
this.setState({endDate});
console.log("end",endDate);
};

date_diff_indays(date1, date2) {
let dt1 = new Date(date1);
let dt2 = new Date(date2);
return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

handleChange(key) {
return function (e) {
var state = {};
state[key] = e.target.value;
this.setState(state);
let fields = this.state.fields;
 fields[key] = e.target.value;  
this.setState({fields});        
}.bind(this);
}


cal_fare() {
let dates1=this.state.startDate;
let dates2=this.state.endDate;
let finalval;
let dipo_amt;
const defcars = this.state.cars ;
var days_diff = this.date_diff_indays(dates1,dates2)+ 1;
if(days_diff > 30){
   alert("Booking is not accepted after 30days");
}
else{
    if(this.state.selectedOption == null){
      finalval = this.props.defval;
    }
    else{
      let selcar =this.state.selectedOption;
      finalval= selcar.value;      
    }
    const sel_car = defcars.find(defcars => defcars.id == finalval);
    const rentprkm = sel_car.Rent_per_km;
    let carmod = sel_car.car_model;  
    let amtpaid = rentprkm * (100 * days_diff);
    this.setState({amt:amtpaid, carmodel:carmod, days:days_diff});
    if(days_diff <= 5){
      dipo_amt = 5000;
    }
    else if(days_diff > 5 && days_diff <= 14){
      dipo_amt = 10000;
    } 
    else if (days_diff > 14 && days_diff <= 30){
      dipo_amt = 15000;
    }
     this.setState({dep_amt:dipo_amt});
    }
}

handleSubmit(event) {
   event.preventDefault();
        if(this.handleValidation()){
           alert("Form submitted");
           var data = [
  this.state.name,
  this.state.carmodel,         
  this.state.amt,
  this.state.days        
  ]
this.setState({showtab:"view"});
this.setState({newdata:data});
console.log("data is",JSON.stringify(data));
}else{
   alert("Form has errors.")
  }
  
}

render(){  
let selectedValue=this.props.defval;    
const carmodels = this.state.cars.map((item) => {            
  return { value: item.id , label: item.car_model }
});
const { selectedOption } = carmodels;
const resultObject = carmodels.find(carmodels => carmodels.value == selectedValue);
console.log("resultObject",JSON.stringify(resultObject));
if(this.state.showtab === 'hide') {
return(
<div>
   <center>
      <h3>Car Rental booking form</h3>
   </center>
   <div className="Formfirst">
      <form onSubmit={this.handleSubmit}>
         <div className="container">
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Name</label>
                  <input ref="name" type="text" size="30" placeholder="Name" onChange={this.handleChange("name")} className="form-control" 
                  value={this.state.fields["name"]}/>
                           <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                   </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Email</label>
                  <input type="email" value={this.state.email} onChange={this.handleChange('email')} className="form-control"/>
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="address">Address</label>
                  <input type="text"  value={this.state.address} onChange={this.handleChange('address')} className="form-control"  id="address" />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="mob">Mobile no</label>
                  <input type="tel"  value={this.state.Mobile} onChange={this.handleChange('Mobile')} className="form-control"  id="mob" />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="license">License no</label>
                  <input type="number"  className="form-control" value={this.state.license} onChange={this.handleChange('license')} id="license" />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Credit card no</label>
                  <input type="text"  value={this.state.ccno} onChange={this.handleChange('ccno')} className="form-control"  id="ccn" />
               </div>
            </div>
            <div className="row">
               <div className="offset-md-4 col-md-2">
                  <label htmlFor="fromdate">From Date</label>
                  <DatePicker  selected={this.state.startDate} onChange={this.handleChangeSDate.bind()}/>
               </div>
               <div className="offset-md-1 col-md-2">
                  <label htmlFor="todate">To Date</label>
                  <DatePicker  selected={this.state.endDate} onChange={this.handleChangeEDate.bind()}/>
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Car model</label>
                  <Select options={carmodels} value={selectedOption}
                     onChange={this.handleselChange}
                     defaultValue={resultObject} />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <input type="button" value="Calculate fare" className="default" onClick={this.cal_fare} id="name" />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Amount to be paid</label>
                  <input type="text"  value={this.state.amt} readOnly  onChange={this.handleChange('amt')}  className="form-control"  id="atbp" />
               </div>
            </div>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <label htmlFor="name">Deposit Amount</label>
                  <input type="text"  readOnly  value={this.state.dep_amt} onChange={this.handleChange('dep_amt')} className="form-control"  id="DA" />
               </div>
            </div>
            <br></br>
            <div className="row">
               <div className="col-md-5 offset-md-4">
                  <input type="submit" value="Submit" className="default"  id="name" />
               </div>
            </div>
         </div>
      </form>
   </div>
</div>
);
}
else if(this.state.showtab === 'view') {
return(
  <Table thead={headers} tbody={this.state.newdata}/>
 );
 }
}
}
export default Booking_form;