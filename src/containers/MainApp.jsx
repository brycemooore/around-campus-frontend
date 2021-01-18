import axios from "axios";
import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import LoggedInState from "../atoms/loggedInAtom";
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav'
import PostButton from '../components/PostButton'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MainApp() {
  const user = useRecoilValue(userState);
  const loggedIn = useRecoilValue(LoggedInState)
  const classes = useStyles();

  const getPosts = async () => {
    const res = await axios.get('/posts');
  }

  return (
    <div className={classes.root}>
        {loggedIn ? 
      (<div>
          <div>
              <Nav />
            </div>
        <div>
        <button onClick={getPosts}>Hello</button>
        {user.username}
        <PostButton user={user}/>
        </div>
      </div>) : <Redirect to="/" />}
    </div>
  );
}
