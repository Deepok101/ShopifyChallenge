import { PromiseProvider } from "mongoose";
import React from "react";
import Login from '../component/login'

const LoginPage = (props) => {
    
    return (
      <div className="container">
        <h1>
          Login
        </h1>
        <Login handleLogin={props.handleLogin}/>
      </div>
    );
}
export default LoginPage;