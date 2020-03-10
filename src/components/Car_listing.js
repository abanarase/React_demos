import React from 'react';
import './Car_listing.css';
import data from  '../Data/Carlist.json';
import {Link} from 'react-router-dom';



class Car_listing extends React.Component {
   // constructor(props) {
   //    super(props);
   //    // this.state = {
   //    // mode:'view'
   //    // };
   //    // console.log("ssaas",this.state);
   //  }
  
    render() {
      const  newdata= data.map((data) =>{
         return (
             <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.car_model}</td>
                <td>{data.registration_no}</td>
                <td>{data.transmission}</td>
                <td>{data.Fuel}</td>
                <td>{data.Displacement_CC}</td>
                <td>{data.Mileage_in_km}</td>
                <td>{data.Color}</td>
                <td>{data.Rent_per_km}</td>              
                <td>{data.Booking_status}</td>          
               <td><input className="Erra" type="button" value="Book" onClick={this.props.action.childHandler}/></td>
 
             </tr>
          )
       })
      
        return (
        
           <div>
              <h3>{this.props.action.mode}</h3>
              <h1 id='title'>Car List</h1>
              <table id='Cars'>
                 <tbody>
                   <tr>                     
                       <th>ID</th>
                       <th>Car model</th>
                       <th>Registration no</th>
                       <th>transmission</th>
                       <th>Fuel</th>
                       <th>Displacement_CC</th>
                       <th>Mileage in km</th>
                       <th>Color</th>
                       <th>Rent per km</th>
                       <th>Booking status</th>
                       <th>Action</th>
                     </tr>
                    {newdata}
                 </tbody>
              </table>
            
           </div>
        )
     }
  }
 
 export default Car_listing;