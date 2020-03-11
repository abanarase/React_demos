import React from 'react';
import Car_listing from './Car_listing';
import Booking_form from './Booking_form';



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
            <Car_listing action={{mode:this.state.mode,childHandler :this.childHandler.bind(this)}} />
      );
    } else {
       return (
            <Booking_form defval={this.state.car}/>
        )
    }
    }
}
    export default Riding;