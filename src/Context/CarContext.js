import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const { Provider: CarProvider, Consumer: CarConsumer } = createContext();

const CarContext = ({ children }) => {
  const [Car, setCar] = useState('light');
  return (
    <CarProvider
      value={{
        Car,
        changeCar: (newCar) => setCar(newCar),
      }}
    >
      {children}
    </CarProvider>
  );
};

CarContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CarContext;
