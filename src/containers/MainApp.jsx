import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
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
import { useSnackbar } from 'notistack';
import ActionCable from 'actioncable'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'



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
  let connection;
  const { enqueueSnackbar, closeSnackbar} = useSnackbar();
  const history = useHistory()

  const action = (convoId) => {
    const onClickHandle = () => {
      closeSnackbar()
      history.push({
        pathname: '/messages', 
        state: {
          idForConvo: convoId
        }
      })
    }
    return(
    <Fragment>
        <Button color="primary"onClick={onClickHandle}>
            Message
        </Button>
    </Fragment>
  )};

  const handleDataFromConnection = (input) =>{
    enqueueSnackbar(input.message.user.username + ' says: ' + input.message.body, {
      autoHideDuration: 3000,
      action: () => action(input.message.conversation_id),
      root: {
        backgroundColor: "#FF8552"
      }
    })
  }

  const createSocket = () => {
    const cable = ActionCable.createConsumer(
      "ws://localhost:3001/" + "cable"
    );
    connection = cable.subscriptions.create(
      { channel: "ChatChannel", user_id: user.id },
      {
        connected: () => console.log("connected"),
        received: (data) => {
          handleDataFromConnection(data);
        },
      }
    );
  };

  const generatePosts = () => {
    return posts.map((post, index) => {
      return <Post remove={removePost} frontId={index} key={index} post={post}/>
    })
  }

  const removePost = (index) => {
    const newPosts = [...posts]
    newPosts.splice(index, 1)
    setPosts(newPosts)
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
    return () => {
      console.log("cleaned up")
      connection.unsubscribe();
    };
  }, [])

  useEffect(() => {
    if(user){
      createSocket()
    }
  }, [user])

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
