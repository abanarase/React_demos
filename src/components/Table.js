import React from 'react';
import './css/Car_listing.css'; 
import './CarListing.js';

class Table extends React.Component {
	 constructor(props){
         super(props)
         this.state={
             posts:[]
         }
     }

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
      const  newdata= columnbody.map((data) =>{
        return(<tr  key={data.id}>
        <td>{data.name}</td> 
        <td>{data.carmodel}</td> 
        <td>{data.amt}</td>
        <td>{data.days}</td>    
        </tr>)
      });      
      return newdata;
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
             {this.generatebody()}  
        </tbody>
        </table>
           </div>
      	 	)
      	}

 }

  export default Table;