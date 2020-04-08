import React from 'react';
import './css/Car_listing.css'; 
import './CarListing.js';

class Table extends React.Component {
	 

 generateHeader(){
 	let columnHeader = this.props.thead;  
 	 let res=[];
     for(var i =0; i < columnHeader.length; i++){
         res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
     }
     return res;
   }
  generatebody(){  	
 	let columnbody = this.props.tbody;  
 	console.log("columnbody",columnbody);
 	 let reo=[];
     for(var i =0; i < columnbody.length; i++){
         reo.push(<td key={columnbody[i]}>{columnbody[i]}</td>)
     }
     return reo;
   }
       render() {
      	 return (
      	 <div>
        <table  id="Cars">
        <thead>
            <tr>
            {this.generateHeader()}
            </tr>
        </thead>
        <tbody>
        <tr>
         {this.generatebody()}
         </tr>
        </tbody>
        </table>
           </div>
      	 	)
      	}

 }

  export default Table;