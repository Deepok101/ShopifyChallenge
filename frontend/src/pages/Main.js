import React, {useContext, useState} from "react";
import LoginPage from './Login'
import ShopPage from './Shop'

const MainPage = (props) => {
    const [accountState, setAccountState] = useState({loggedIn: false});
    const handleLogin = (state) => {
      setAccountState(state)
      console.log(accountState)
    }

    if(accountState.loggedIn){
      return (<ShopPage username={accountState.username}/>);
    } else {
      return (<LoginPage handleLogin={handleLogin}/>)
    }

}
export default MainPage;