import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import home from './components/home';
import favourite from './components/favourite';
import '../node_modules/bulma/css/bulma.css'


class App extends Component {
  constructor(){
    super();
    this.state={
      activeTab:'/'
    }
  }
  componentDidMount(){
    this.setState({activeTab:window.location.pathname})
  }
  render() {
    return (
      <Router>
        <div>         
          <div className="header">
          <Link to="/" className="logo" >Beans Love Beers</Link>
            <div className="header-right">
              <Link to="/" onClick={e=>this.setState({activeTab:'/'})} className={this.state.activeTab=='/' ? 'active' :''} >Home</Link>
              <Link to="/favourite" onClick={e=>this.setState({activeTab:'/favourite'})} className={this.state.activeTab=='/favourite' ? 'active' :''} >Favourite</Link>            
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
