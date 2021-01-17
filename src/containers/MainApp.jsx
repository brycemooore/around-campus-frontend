import axios from "axios";
import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import LoggedInState from "../atoms/loggedInAtom";
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav'
export default function MainApp() {
  const user = useRecoilValue(userState);
  const loggedIn = useRecoilValue(LoggedInState)

  return (
    <div>
        {loggedIn ? 
      (<div>
          <div>
              <Nav />
            </div>
        <div>
        <button>Hello</button>
        {user.username}
        </div>
      </div>) : <Redirect to="/" />}
    </div>
  );
}
