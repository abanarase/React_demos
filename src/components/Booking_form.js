import React from 'react';
import './Booking_form.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from  '../Data/Carlist.json';

const Countries = [
    { label: "India", value: 2 },
    { label: "US", value: 1 },
    { label: "China", value: 3 },
    { label: "Australia", value: 4 },
    { label: "Iraq", value: 5 },
    { label: "Iran", value: 6 },
  ];
 
class Booking_form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars:data ,
            value: ""           
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);  
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
render(){
    let selectedValue=this.props.defval;    
    const carmodels = this.state.cars.map((item) => {            
        return { value: item.id , label: item.car_model }
         
      });
      const resultObject = carmodels.find(carmodels => carmodels.value == selectedValue);
 
    console.log("resultObject",JSON.stringify(resultObject));
    return(
        <div>           
        <center><h3>Rental booking form</h3></center>
        <div className="Formfirst">
        <form onSubmit={this.handleSubmit}>
        <div className="container">
        <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Name</label>
                    <input type="text"  value={this.state.value} onChange={this.handleChange} className="form-control"  id="name" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Email</label>
                    <input type="text"  className="form-control"  id="email" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Address</label>
                    <input type="text"  className="form-control"  id="address" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
            <label htmlFor="cont">Country</label>
            <Select options={ Countries } />
            </div>
        </div>

        <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="mob">Mobile no</label>
                    <input type="tel"  className="form-control"  id="mob" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="license">License no</label>
                    <input type="text"  className="form-control"  id="license" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Credit card no</label>
                    <input type="text"  className="form-control"  id="ccn" />
            </div>
         </div>
         <div className="row">
            <div className="offset-md-4 col-md-2">
                <label htmlFor="fromdate">From Date</label>
                    <input type="text"  className="form-control"  id="fromdate" />                    
            </div>
            <div className="offset-md-1 col-md-2">
            <label htmlFor="todate">To Date</label>
                    <input type="text"  className="form-control"  id="todate" />
            </div>
         </div>
         <div className="row">
            <div className="col-md-5 offset-md-4">
            <label htmlFor="name">Car model</label>
            <Select options={carmodels} defaultValue={resultObject} />
            </div>
        </div>
        <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Amount to be paid</label>
                    <input type="text"  className="form-control"  id="atbp" />
            </div>
         </div>
        <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Deposit Amount</label>
                    <input type="text"  className="form-control"  id="DA" />
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
 
}

export default Booking_form;