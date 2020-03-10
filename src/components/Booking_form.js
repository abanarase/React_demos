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
  function handleClick(e) {
    //e.preventDefault();
    console.log('The link was clicked.',e);
  }
class Booking_form extends React.Component {
    constructor(props) {
        super(props);
       
      
        this.state = {            
            cars:data}
    }
      
render(){
    const modelList =[];
    
    console.log("bookingyy",this.state);
    const carmodels = this.state.cars.map((item) => {  
        return item.car_model     
         
      })
      console.log("carmodels",carmodels);
      for (var i = 0; i < carmodels.length; i++) {
        modelList.push({
            label: carmodels[i],
        value: 0
      });
    }
      console.log(JSON.stringify(modelList));
    return(
        <div>
        <center><h3>Rental booking form</h3></center>
        <div className="Formfirst">
        <form>
        <div className="container">
        <div>
            <h1>{this.props.headerProp}</h1>
         </div>
        <div className="row">
            <div className="col-md-5 offset-md-4">
                <label htmlFor="name">Name</label>
                    <input type="text"  className="form-control"  id="name" />
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
            <Select options={modelList} defaultValue={{ label: "Maruti Suzuki Dzire", value: 2002 }} />
            </div>
        </div>
        <br></br>
        <div className="row">
            <div className="col-md-5 offset-md-4">
            <input type="submit"  className="default"  id="name" />
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