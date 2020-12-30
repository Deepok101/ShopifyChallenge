import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Login = (props) => {
  const [username, userInput] = useState('');
  const [password, passwordInput] = useState('');
  const [loggedIn, setLoginState] = useState(false);
  const [token, setToken] = useState(null);
  
  const login = () => {
    const body = {
        'username' : username,
        'password' : password,
    }
    
    fetch('/user/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then((res) => res.json()).then(res => {
      if(res.error){
        console.log(res.error)
      } else {
        setLoginState(res.session)
        setToken(res.token)
        console.log(res)
        props.handleLogin({username: res.result.username, credits:res.result.credits, loggedIn: res.session})
      }
    })
  }
  return (
      <div className="container"> 
          <input type="text" placeholder="Username" onChange={e => userInput(e.target.value)} />
          <input type="text" placeholder="Password" onChange={e => passwordInput(e.target.value)} />
          <button onClick={login}>Login</button>
      </div>

    );
}
export default Login;