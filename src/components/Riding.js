import React from 'react';
import CarListing from './CarListing';
import BookingForm from './BookingForm';



class Riding extends React.Component {
    constructor(props) {
       super(props);       
       this.state = {mode:'view',car:""};    
     }

     childHandler(item) {       
        this.setState({mode:"hide",car:item.target.id});  
        console.log(item.target.id)
        console.log("item is",item);
     }
   
     render() {
       if(this.state.mode === 'view') {
            return (       
            <CarListing action={{mode:this.state.mode,childHandler :this.childHandler.bind(this)}} />
      );
    } else {
       return (
            <BookingForm defval={this.state.car}/>
        )
    }
    }
}
    export default Riding;