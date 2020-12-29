import React from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// import Home from "../pages/home";
import RegisterPage from '../pages/register'
import MainPage from '../pages/Main'

import PropTypes from 'prop-types'

class AppRouter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }

  }
  
  componentDidMount(){
    document.body.style.background = '#eff6ff'
    
  }
  
  render(){
    const a = window.sessionStorage.getItem('loggedIn');

    return (
     
        <Router>
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/shop" exact component={MainPage} />
        </Router>
    
    );
  }
    
}
  
export default AppRouter;