import React, {Component} from 'react';
import Button from './library/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//import CarContext from '../Context/CarContext';
import InputField from "./library/InputField";
import Dropdown from "./library/Dropdown";
import Select from 'react-select';
import TextArea from './library/TextArea';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { addDays } from 'date-fns';
import data from  '../Data/Carlist.json';
import {withRouter} from 'react-router-dom'


const divAlign={display: 'flex',flexDirection: 'row'}
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid lightgray',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#8c0505' : 'white'
  }),
  control: (provided) => ({
    ...provided
  })
}
const regex = {
  text:new RegExp(/^[a-zA-Z]+$/),
  email: new RegExp(
      '^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  ),        
  number: new RegExp('^[0-9]+$'),
};
 class BookingForm extends Component {
  //static contextType = CarContext;

    state = {
        text: '',
        name:'',
        mobile: '',
        cars:data ,
        email: '',
        car: null,
        message: '',
        address:'',
        ccno:'',
        deptAmt:'',
        amt:'',
        days:'',
        carmodel:'',
        read:true,
        setLoading:'',
        setError:'',
        startDate: new Date(),
      endDate : new Date(),
      errors: {}
    };
     
    handleValidation(){
      console.log("ssqwee////////////",JSON.stringify(this.state));
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

    handleClick = (event ) => {
        event.preventDefault();
        if(!this.handleValidation()){
         alert("Please check errors");          
        }else{
        console.log(this.state);
        const{name,carmodel,amt,days}=this.state;
        let newData = {name,carmodel,amt,days}
        this.addUser(newData);
        alert('Form submited');
        this.props.history.push('./Users');
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
      let finalcar;
      const defcars = cars ;
      if(car === null){
        finalcar = this.props.defval;  
        console.log("ss",finalcar);   
        this.setState({car:finalcar});   
      }
      else{        
        finalcar= car; 
      }
      let days_diff = this.date_diff_indays(dates1,dates2) + 1 ;
      console.log("days_diff",days_diff);
        const selCar = defcars.find(defcars => defcars.id === parseInt(finalcar));
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
      apiCall = (url, reqInit = {}) => {
        this.setState({setLoading:true});
        return new Promise((resolve, reject) => {
          fetch(url, reqInit)
            .then((res) => res.json())
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {              
              this.setState({setError:err});
              reject(err);
            })
            .finally(() => {
         this.setState({setLoading:false});
            });
        });
      };
      
      addUser = async (data) => {
        const newUser= await this.apiCall('http://localhost:3001/Todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.warn(newUser);

      };
    render() {
      let selectedValue=this.props.defval;    
      const carmodels = this.state.cars.map((item) => {            
        return { value: item.id , label: item.car_model }
      });
      console.log("car us",JSON.stringify(carmodels));
      const { car } = carmodels;
      const resultObject = carmodels.find(carmodels => carmodels.value === parseInt(selectedValue));
      console.log("resultObject",JSON.stringify(resultObject));

        const {name,email,mobile,address,ccno,amt,deptAmt,startDate,endDate,showtab,read} = this.state;
  
        return (
         <div className="offset-2 col-8">
          <div style={{backgroundColor:"#8c0505",color:'white',textAlign:"center",padding:"5px"}} ><h4>Car Booking Form</h4>
          </div>
          <div style={divAlign}>
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

          </div>
          <div style={divAlign}>
          <InputField
             value={mobile}
             type='text'
             placeholder='Mobile'                    
             onChange={this.handleChange('mobile')}/>
          <span style={{color: "red"}}>{this.state.errors["mobile"]}</span>
          
          <InputField value={ccno}
             type='text' placeholder='Enter credit card no here...'
             onChange={this.handleChange('ccno')}/>
          <span style={{color: "red"}}>{this.state.errors["ccno"]}</span>
          </div>
          <div style={divAlign}>
          <TextArea value={address}
             label='Permanant Address'
             type='text' placeholder=' Address'                    
             onChange={this.handleChange('address')}/>
          <span style={{color: "red"}}>{this.state.errors["address"]}</span>

          </div>
          <div style={divAlign}>
             <div className="form-group col-6" style={{display: 'flex',flexDirection: 'column'}}>

                <label htmlFor="fromdate">From :</label>
                <DatePicker className="form-control" minDate={new Date()} selectsStart startDate={startDate} endDate={endDate}
                selected={startDate} onChange={this.handleChange('startDate')}/>
             </div>
             <div className="form-group col-6" style={{display: 'flex',flexDirection: 'column'}}>
                <label htmlFor="todate">To : </label>
                <DatePicker className="form-control" maxDate={addDays(new Date(), 30)} selectsEnd startDate={startDate}
                endDate={endDate} minDate={startDate} selected={endDate}
                onChange={this.handleChange('endDate')}/>
             </div>
          </div>
          <div style={divAlign}>
               <div className="col"  style={{display: 'flex',flexDirection: 'column'}}>
                  <label htmlFor="name">Car model :</label>
                  <Select options={carmodels} styles = { customStyles } value={car}
                     placeholder='Select Car'
                     onChange={this.handleDropdown} defaultValue={resultObject} />
               </div>
          </div>
          <div style={divAlign}>
          <InputField value={amt} label="Paid Amount :"
             type='text' placeholder='Amount to be pay'
             readonly={read}                    
             onChange={this.handleChange('amt')}/>

          <InputField value={deptAmt} label="Deposit Amount :"
             type='text' placeholder='Amount to be Deposit'
             readonly={read}                    
             onChange={this.handleChange('deptAmt')}/>

          </div>
          <div style={divAlign}>
            
            <Button onClick={this.calFare} className="app-button col-6"
             value='Calculate fare'/>
         
            
          <Button onClick={this.handleClick} className="app-button col-6"
             value='Submit'/>

          </div>
          </div>
        );
        
    }
    

}
export default withRouter(BookingForm);