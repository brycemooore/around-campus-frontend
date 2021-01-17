import React, { useEffect } from "react";
import SignUp from "./components/SignUp";
import { Switch, Route, useHistory } from "react-router-dom";
import MainApp from "./containers/MainApp";
import { useRecoilState, useRecoilValue } from "recoil";
import loggedInState from "./atoms/loggedInAtom";
import userState from "./atoms/userAtom";
import axios from "axios";
import Welcome from "./containers/Welcome";
import Login from "./components/Login";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: "#FF8552",
          },
          secondary: {
            main: "#85FFC7",
          }
        },
      }),
    [prefersDarkMode],
  );

  useEffect(async () => {
    if (localStorage.token) {
      setLoggedIn(true);
      const res = await axios.get("/current_user");
      setCurrentUser(res.data);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={MainApp} />
      </Switch>
    </ThemeProvider>
    </div>
  );
}

export default App;
