import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Place } from './components/Place';
import Great from './components/Great';
import Welcome from './components/Welcome';
import Graph from './components/Graph';

 function App() {
  return (
    <div className="App">
      
      <Great />
      <Welcome />
      <Place />
      <Graph />
      </div>
  );
}

export default App;
