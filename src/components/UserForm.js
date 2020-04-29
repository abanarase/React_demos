import React from 'react';
import BookingForm from './BookingForm';


  const UserForm = (props) =>{  
      
      
        return (        
           <div>    
              <BookingForm defval={props.defval}></BookingForm>                            
           </div>
        )
     
  }
 
 export default UserForm;
