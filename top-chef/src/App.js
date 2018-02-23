import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './lafourchette.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Michelin restaurants deals on LaFourchette</h1>
        </header>
        <ul>
        {
          data.map(function(restaurant){
            return <li>{restaurant.name} : {restaurant.deal}</li>;
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
