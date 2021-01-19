import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import LoggedInState from "../atoms/loggedInAtom";
import { Redirect } from "react-router-dom";
import Nav from "../components/Nav";
import PostButton from "../components/PostButton";
import { makeStyles } from "@material-ui/core/styles";
import {List} from '@material-ui/core'
import Post from '../components/Post'
import FeedHeader from '../components/FeedHeader'

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
  const loggedIn = useRecoilValue(LoggedInState);
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const generatePosts = () => {
    return posts.map((post, index) => {
      return <Post  key={index} post={post}/>
    })
  }

  const addPost = (post) => {
    setPosts([post, ...posts])
  }

  const getPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data)
  };
  
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className={classes.root}>
      {loggedIn ? (
        <div>
          <Nav />
          <FeedHeader school={user.school}/>
          <List>
            {generatePosts()}
          </List>
          <PostButton addPost={addPost} user={user} />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}
