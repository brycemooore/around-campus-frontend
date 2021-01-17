import React from "react";
import { Link } from "react-router-dom";
import {useRecoilValue} from 'recoil';
import LoggedInState from '../atoms/loggedInAtom'
import {Redirect} from 'react-router-dom'

export default function Welcome() {

    const loggedIn = useRecoilValue(LoggedInState)

  return (
    <div>
        {loggedIn ? <Redirect to="/home" /> :
      (
      <div>
          <h1>Welcome!</h1>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
      </div>
      )} 
    </div>
  )
}
