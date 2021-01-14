import React from "react";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainApp from "./containers/MainApp";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const userState = atom({
  key: 'userState',
  default: {}
})

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/" component={MainApp} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
