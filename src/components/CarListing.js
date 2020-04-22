import React from 'react';
import Table from "./Table";
import data from  '../Data/Carlist.json';
const theader =[ "ID","Car model","Registration no","Transmission","Fuel","Displacement_CC","Mileage in km",
"Color","Rent per km","Booking status","Action"];


  const CarListing = (props) =>{

   const generateHeader= ()=>{
      let columnHeader = theader;  
       let res=[];
       for(var i =0; i < columnHeader.length; i++){
           res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
       }
       return res;
     }
     const generatebody= ()=> {  	
      let columnbody = data ;   	
        const  newdata= columnbody.map((data) =>{
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
               <td><input className="Erra" type="button" value="Book" id={data.id}  onClick={e =>props.action.childHandler(e, "id")}/></td>
 
             </tr>
          )
       });
       return newdata;
      }
      
        return (
        
           <div>        
                    
              <h1 id='title'>Car List</h1>
              <Table thead={generateHeader()} tbody={generatebody()}/>              
           </div>
        )
     
  }
 
 export default CarListing;
