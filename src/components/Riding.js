import React from 'react';
import CarListing from './CarListing';
import BookingForm from './BookingForm';

class Riding extends React.Component {
    constructor(props) {
       super(props);       
       this.state = {
         isViewCar:true,
         car:""
        };    
     }

     childHandler(item) {       
        this.setState({isViewCar:false,car:item.target.id});          
     }
   
     render() {
       const { isViewCar,car } = this.state;
       if(isViewCar === true) {
            return (       
            <CarListing action={{mode:this.state.mode,childHandler :this.childHandler.bind(this)}} />
      );
    } else {
       return (        
            <BookingForm defval={car}></BookingForm>
        )
    }
    }
}
    export default Riding;