import React, { Component, useState } from "react";
import {useHistory} from 'react-router-dom'
import {Button} from "react-bootstrap";

const Register = (props) => {
  const [username, userInput] = useState('');
  const [password, passwordInput] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');
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
        setRegisterMsg(res.msg)
      }
    })
  }
  return (
    <div> 
        <input type="text" placeholder="Username" onChange={e => userInput(e.target.value)} />
        <input type="text" placeholder="Password" onChange={e => passwordInput(e.target.value)} />
        <Button variant="primary" onClick={register}>Register</Button>
        <h3>{registerMsg}</h3>
        <Button variant="primary" onClick={() => history.push("/shop")}>Go to login page</Button>
    </div>
    );
}
export default Register;