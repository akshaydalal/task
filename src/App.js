import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import home from './components/home';
import favourite from './components/favourite';

class App extends Component {
  render() {
    return (
      <Router>
        <div>         
          <div className="header">
          <Link to="/" className="logo" >Beans Love Beers</Link>
            <div className="header-right">
              <Link to="/" className="active" >Home</Link>
              <Link to="/favourite">Favourite</Link>            
            </div>
          </div>
  
  
          <Route exact path="/" component={home} />        
          <Route path="/favourite" component={favourite} />
        </div>
      </Router>
    );
  }
}

export default App;
