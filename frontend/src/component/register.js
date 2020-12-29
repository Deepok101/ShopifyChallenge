import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from 'react-router-dom';

const Register = (props) => {
  const [username, userInput] = useState('');
  const [password, passwordInput] = useState('');
  const history = useHistory()

  const register = () => {
    const body = {
        'username' : username,
        'password' : password,
    }
    
    fetch('/user/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then((res) => res.json()).then(res => {
      if(res.error){
        console.log(res.error)
      } else {
        history.push('/login')
      }
    })
  }
  return (
    <div className="container"> 
        <input type="text" placeholder="Username" onChange={e => userInput(e.target.value)} />
        <input type="text" placeholder="Password" onChange={e => passwordInput(e.target.value)} />
        <button onClick={register}>Register</button>
    </div>
    );
}
export default Register;