import React, {Component} from 'react';
import Button from './library/Button';
import InputField from "./library/InputField";
import Select from 'react-select';
import TextArea from './library/TextArea';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './css/BookingForm.css';
import moment from "moment";
import { addDays } from 'date-fns';
import data from  '../Data/Carlist.json';
import Users from './UserList';


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
  text:new RegExp(/^[a-zA-Z]/),
  email: new RegExp(
      '^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  ),        
  number: new RegExp('^[0-9]+$'),
};
 class BookingForm extends Component {

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
        showUserList:false,
        read:true,
        setLoading:'',
        setError:'',
        carOptions:'',
        persons:[],
        isEditMode:false,
        startDate: new Date(),
      endDate : new Date(),
      errors: {}
    };
     
    handleValidation(){
        let {name,email,mobile,address,ccno,amt} = this.state;
        let errors = {};
        let formIsValid = true;        
        
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
      if(ccno.length > 0){
        const result = regex.number.test(ccno);
        if(!result){
        formIsValid = false;
        errors["ccno"] = "Enter Digit only";
      } 
      if(amt.length==0){            
        formIsValid = false;
        errors["amt"] = "Please calculate fare";
      }            
    }else{
          formIsValid = false;
          errors["ccno"] = "Required";
        }
       this.setState({errors: errors});
       return formIsValid;
   }

    handleChange = (key) => (value) => { 
      if(key == 'startDate' || key== 'endDate'){
        const{amt}=this.state;
        if(amt!=''){
          this.setState({amt:'',deptAmt:''});
        }
      }    
        this.setState({[key]: value});
    };

    handleClick = (event ) => {
        event.preventDefault();
        if(!this.handleValidation()){
         alert("Please check errors");          
        }
        else{
        const{name,persons,amt,days,email,mobile,address,ccno,deptAmt,startDate,endDate,isEditMode,car}=this.state;
        let newData = {name,amt,days,email,mobile,address,ccno,deptAmt,startDate,endDate,car}
        if(isEditMode){
          this.updateUser(newData,persons.id);
        }
        else{
          this.addUser(newData);
        }
        
        this.setState({showUserList:true});
        alert('Form submited');
        }
    };

    handleDropdown = (car) => {
      const{amt}=this.state;
        if(amt!=''){
          this.setState({amt:'',deptAmt:''});
        }
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
      let dipo_amt;      
      //alert(car);
      let days_diff = this.date_diff_indays(startDate,endDate) + 1 ;      
        let selCar = cars.find(cars => cars.id === parseInt(car.value));
        let rentprkm = selCar.Rent_per_km;
        let amtpaid = rentprkm * (100 * days_diff);
        this.setState({amt:amtpaid, days:days_diff});     
          
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
      editHandler(item) {       
        this.setState({showUserList:false,isEditMode:true});  
        this.getUser(item);           
     }
      getUser = async (data) => {
         const persons= await this.apiCall(`http://localhost:3001/Todos/${data}`, {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },          
        });
        
       this.setState({ persons });
       this.editedData();       
      };
      
     editedData(){ 
        const{persons}=this.state;
        for (let key in persons) { 
          if (persons.hasOwnProperty(key)) 
          { 
            let value = persons[key];
            if(key == 'startDate' || key == 'endDate'){
              value=new Date(value);
            }               
            this.setState({[key]:value}); 
          } 
      } 
      
      }
      addUser = async (data) => {
        const addBooking= await this.apiCall('http://localhost:3001/Todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.warn(addBooking);

      };
       updateUser = async (data,id) => {
        const updateBooking = await this.apiCall(`http://localhost:3001/Todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.warn(updateBooking);
      }
       deleteHandler= async (id)=>{        
        const deleteBooking = await this.apiCall(`http://localhost:3001/Todos/${id}`, {
          method: 'Delete',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          }        
        });        
        console.warn(deleteBooking);
        this.setState({showUserList:true});
      }
      componentDidMount(){        
        const{cars}=this.state;    
        const carmodels = cars.map((item) => {            
        return { value: item.id , label: item.car_model }
      });
       let sCar = carmodels.find(carmodels => carmodels.value === parseInt(this.props.defval));
       this.setState({car:sCar,carOptions:carmodels});
      }


    render() {
         
      const {name,email,mobile,address,ccno,amt,deptAmt,startDate,endDate,carOptions,showUserList,isEditMode,read,car} = this.state;
      
        if(!showUserList) {
          return(
          <div className="offset-2 col-8">
          <div className='parentBlock'><h4>Car Booking Form</h4>
          </div>
          <div className='blockElement'>
          <InputField 
             value={name}              
             type='text' placeholder='Full Name'                    
             onChange={this.handleChange('name')}/>
         
          <InputField
             value={email}
             type='email'
             placeholder='Email'                    
             onChange={this.handleChange('email')}/>
         
          </div>
          <div className='blockElement'>
          <span className='spanElement col-6'>{this.state.errors["name"]}</span>
          <span className='spanElement col-6'>{this.state.errors["email"]}</span>
          </div>

          <div className='blockElement'>
          <InputField
             value={mobile}
             type='text'
             placeholder='Mobile'                    
             onChange={this.handleChange('mobile')}/>
          
          <InputField value={ccno}
             type='text' placeholder='Enter credit card no here...'
             onChange={this.handleChange('ccno')}/>
          
          </div>
          
          <div className='blockElement'>
          <span className='spanElement col-6'>{this.state.errors["mobile"]}</span>
          <span className='spanElement col-6'>{this.state.errors["ccno"]}</span>
          </div>

          <div className='blockElement'>
          <TextArea value={address}
             label='Permanant Address'
             type='text' placeholder=' Address'                    
             onChange={this.handleChange('address')}/>          
          </div>
          <div>
          <span className='spanElement col-6'>{this.state.errors["address"]}</span>
          </div>
          <div className='blockElement'>
             <div className="form-group col-6 colBlocks">
                <label htmlFor="fromdate">From :</label>
                <DatePicker className="form-control" minDate={startDate} selectsStart startDate={startDate} endDate={endDate}
                selected={startDate} onChange={this.handleChange('startDate')}/>
             </div>
             <div className="form-group col-6 colBlocks">
                <label htmlFor="todate">To : </label>
                <DatePicker className="form-control" maxDate={addDays(new Date(), 30)} selectsEnd startDate={startDate}
                endDate={endDate} minDate={startDate} selected={endDate}
                onChange={this.handleChange('endDate')}/>
             </div>
          </div>
          <div className='blockElement'>
               <div className="col colBlocks">
                  <label htmlFor="name">Car model :</label>
                  <Select options={carOptions} styles = { customStyles } value={car}
                     placeholder='Select Car' defaultValue={car}
                     onChange={this.handleDropdown}  />
               </div>
          </div>

          <div className='blockElement'>
          <InputField value={amt} label="Paid Amount :"
             type='text' placeholder='Amount to be pay'
             readonly={read}                    
             onChange={this.handleChange('amt')}/>

          <InputField value={deptAmt} label="Deposit Amount :"
             type='text' placeholder='Amount to be Deposit'
             readonly={read}                    
             onChange={this.handleChange('deptAmt')}/>
          </div>
          <div className='blockElement'>
          <span className='spanElement col-8'>{this.state.errors["amt"]}</span>
          </div>
          <div className='blockElement'>
            <Button onClick={this.calFare} className="app-button col-6"
             value='Calculate fare'/> 
            {isEditMode
        ?  <Button onClick={this.handleClick} className="app-button col-6"
        value='Update'/>    
        :  <Button onClick={this.handleClick} className="app-button col-6"
        value='Submit'/>
    
      }
          </div>
          </div>
        );
          }
          else if(showUserList) {
            return(
              <Users action={{showUserList,editHandler :this.editHandler.bind(this),deleteHandler:this.deleteHandler.bind(this)}} />
             );
             }  
    }
}
export default BookingForm;