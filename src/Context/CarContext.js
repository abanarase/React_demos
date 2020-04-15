import React, { Component } from 'react'

const CarContext = React.createContext();

class CarProvider extends Component {
  // Context state
  state = {
    Car: {},
  }

  // Method to update state 
  setCar = Car => {
      console.log("Car is updated",Car);
    this.setState(prevState => ({ Car }))
  }

  render() {
    const { children } = this.props
    const { Car } = this.state
    const { setCar } = this

    return (
      <CarContext.Provider
        value={{
          Car,
          setCar,
        }}
      >
        {children}
      </CarContext.Provider>
    )
  }
}

export default CarContext;
export const CarConsumer = CarContext.Consumer;
export { CarProvider }

