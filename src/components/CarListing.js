import React, { useState, useRef, useEffect, memo } from 'react';
import Table from "./Table";
import data from  '../Data/Carlist.json';
const theader =[ "ID","Car model","Registration no","Transmission","Fuel","Displacement_CC","Mileage in km",
"Color","Rent per km","Booking status","Action"];


  const CarListing = (props) =>{
   const [carList, setCarList] = useState([]);
   const generateHeader= ()=>{
      console.log("in re");
      let columnHeader = theader;  
       let res=[];
       for(var i =0; i < columnHeader.length; i++){
           res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
       }
       return res;
     }
     const generatebody= (carobj)=> {  	
      let columnbody = carobj ;   	
        const  newdata= columnbody.map((carobj) =>{
         return (
             <tr key={carobj.id}>
                <td>{carobj.id}</td>
                <td>{carobj.car_model}</td>
                <td>{carobj.registration_no}</td>
                <td>{carobj.transmission}</td>
                <td>{carobj.Fuel}</td>
                <td>{carobj.Displacement_CC}</td>
                <td>{carobj.Mileage_in_km}</td>
                <td>{carobj.Color}</td>
                <td>{carobj.Rent_per_km}</td>              
                <td>{carobj.Booking_status}</td>          
               <td><input className="Erra" type="button" value="Book" id={carobj.id}  onClick={e =>props.action.childHandler(e, "id")}/></td>
 
             </tr>
          )
       });
       return newdata;
      }
      const loadData = async () => {
         const updata = generatebody(data);
         setCarList(updata);
       };
       const filterList=(e)=>{
         let alpha=e.target.value;
         let mapItem =  data.filter(function(item) {
            let car= item.car_model
            return car.toLowerCase().indexOf(alpha.toLowerCase()) !== -1
         });
         const updatedList=generatebody(mapItem);
         setCarList(updatedList);         
      }

      useEffect(() => {
         loadData();
       }, []);
      
        return ( 
           <div>    
              <h1 id='title'>Car List</h1>
              <fieldset className="form-group col-3">
        <input type="text" className="form-control form-control-lg" placeholder="Search car" onChange={filterList}/>
        </fieldset>
              <Table thead={generateHeader()} tbody={carList}/>              
           </div>
        )
     
  }
 
 export default CarListing;
