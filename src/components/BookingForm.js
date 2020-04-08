import React, {Component} from 'react';
import Button from './library/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputField from "./library/InputField";
import Dropdown from "./library/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { addDays } from 'date-fns';
import data from  '../Data/Carlist.json';
import Table from "./Table";

const headers = ["Name","Car model","Total Amount","Days"];

const regex = {
  text:new RegExp(/^[a-zA-Z]+$/),
  email: new RegExp(
      '^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  ),        
  number: new RegExp('^[0-9]+$'),
};
export default class BookingForm extends Component {

    state = {
        text: '',
        name:'',
        mobile: '',
        cars:data ,
        email: '',
        car: '',
        message: '',
        address:'',
        ccno:'',
        deptAmt:'',
        amt:'',
        days:'',
        newdata: '',
        carmodel:'',
        showtab:"hide",
        read:true,
        startDate: new Date(),
      endDate : new Date(),
      errors: {}
    };
    handleValidation(){
        let {name,email,mobile,address,ccno,car} = this.state;
        let errors = {};
        let formIsValid = true;        
        //Name
        if(name.length > 0){
            const result = regex.text.test(name);
              if(!result){
            formIsValid = false;
            errors["name"] = "Only letters";
            }             
        }else{
          formIsValid = false;
          errors["name"] = "Required";
        }

        if(email.length > 0){
            const result = regex.email.test(email);
              if(!result){
            formIsValid = false;
            errors["email"] = "Enter email in valid format";
            }             
        }else{
          formIsValid = false;
          errors["email"] = "Required";
        }

        if(mobile.length>0){
          const mobresult = regex.number.test(mobile);
          if(!mobresult){
          formIsValid = false;
          errors["mobile"] = "Enter Digit only";
            }
      }else{
        formIsValid = false;
        errors["mobile"] = "Required";
      }

      if(address.length==0){            
        formIsValid = false;
        errors["address"] = "Required";
      }
      if(car.length==0){            
          formIsValid = false;
          errors["car"] = "Required";
      }
      if(ccno.length > 0){
        const result = regex.number.test(ccno);
        if(!result){
        formIsValid = false;
        errors["ccno"] = "Enter Digit only";
      }             
    }else{
          formIsValid = false;
          errors["ccno"] = "Required";
        }
       this.setState({errors: errors});
       return formIsValid;
   }

    handleChange = (key) => (value) => {
        this.setState({[key]: value});
    };

    handleClick = (event) => {
        event.preventDefault();
        if(!this.handleValidation()){
         alert("Please check errors");          
        }else{
        console.log(this.state);
        const{name,carmodel,amt,days}=this.state;
        var data = [name,carmodel,amt,days];
        this.setState({showtab:"view"});
        this.setState({newdata:data});
        console.log("data is",JSON.stringify(data));
        alert('Form submited');
        }
    };

    handleDropdown = (car) => {
          this.setState({car});
    };

    date_diff_indays=(startDate, endDate)=> {
      if (!moment.isMoment(startDate)) startDate = moment(startDate);
      if (!moment.isMoment(endDate)) endDate = moment(endDate);
  
      return endDate.diff(startDate, "days");
    }
  
      calFare = (event) => {
      event.preventDefault();
      const{startDate,endDate,car,cars}=this.state;
      let dates1=startDate;
      let dates2=endDate;
      let dipo_amt;
      const defcars = cars ;
      var days_diff = this.date_diff_indays(dates1,dates2) + 1 ;
      console.log("days_diff",days_diff);
        const selCar = defcars.find(defcars => defcars.id === parseInt(car));
          const rentprkm = selCar.Rent_per_km;
          let model = selCar.car_model;
          let amtpaid = rentprkm * (100 * days_diff);
          this.setState({amt:amtpaid, days:days_diff,carmodel:model});      
          
          switch (true)
        {
          case (days_diff <= 5):
          dipo_amt = 5000;
          break;
          case (days_diff <= 14):
          dipo_amt = 10000;
          break;
          case (days_diff <= 30):
          dipo_amt = 15000;
          break; 
       }
       this.setState({deptAmt:dipo_amt});
        
      }
      
    render() {
        const carmodels = this.state.cars.map((item) => {            
            return { value: item.id , label: item.car_model }
          });
        const {name,email,mobile,address,ccno,amt,deptAmt, car,startDate,endDate,showtab,read} = this.state;
        if(showtab == "hide"){
        return (
          <div className="container">
          <h2>
             <center>Car Booking Form</center>
          </h2>
          <hr/>
          <InputField 
             value={name} 
             type='text' placeholder='Full Name'                    
             onChange={this.handleChange('name')}/>
          <span style={{color: "red"}}>{this.state.errors["name"]}</span>

          <InputField
             value={email}
             type='email'
             placeholder='Email'                    
             onChange={this.handleChange('email')}/>
          <span style={{color: "red"}}>{this.state.errors["email"]}</span>

          <InputField
             value={mobile}
             type='text'
             placeholder='Mobile'                    
             onChange={this.handleChange('mobile')}/>
          <span style={{color: "red"}}>{this.state.errors["mobile"]}</span>

          <InputField value={address}
             type='text' placeholder=' Address'                    
             onChange={this.handleChange('address')}/>
          <span style={{color: "red"}}>{this.state.errors["address"]}</span>

          <InputField value={ccno}
             type='text' placeholder='Enter credit card no here...'
             onChange={this.handleChange('ccno')}/>
          <span style={{color: "red"}}>{this.state.errors["ccno"]}</span>

          <Dropdown
             data={carmodels}
             styleClass='mt-3'
             value={car}
             placeholder='Select Car'
             onChange={this.handleDropdown}
             />
          <span style={{color: "red"}}>{this.state.errors["car"]}</span>
          
          <div className="row">
             <div className="col-md-2">
                <label htmlFor="fromdate">From Date :</label>
                <DatePicker minDate={new Date()} selectsStart startDate={startDate} endDate={endDate}
                selected={startDate} onChange={this.handleChange('startDate')}/>
             </div>
             <div className="offset-md-2 col-md-2">
                <label htmlFor="todate">To Date : </label>
                <DatePicker maxDate={addDays(new Date(), 30)} selectsEnd startDate={startDate}
                endDate={endDate} minDate={startDate} selected={endDate}
                onChange={this.handleChange('endDate')}/>
             </div>
          </div>
          <br></br>
          <InputField value={amt}
             type='text' placeholder='Amount to be pay'
             readonly={read}                    
             onChange={this.handleChange('amt')}/>
          <InputField value={deptAmt}
             type='text' placeholder='Amount to be Deposit'
             readonly={read}                    
             onChange={this.handleChange('deptAmt')}/>
          <Button onClick={this.calFare}
             value='Calculate fare'/>
          <Button onClick={this.handleClick}
             value='Submit'/>
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
