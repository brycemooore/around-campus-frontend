import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Messages from "./Messages";
import ConversationBar from "../components/ConversationBar";
import UserState from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import ActionCable from 'actioncable'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function MessagesContainer(props) {
  const classes = useStyles();
  const [conversations, setConversations] = useState([{messages: [], sender: {username: ''}, recipient:{username: ''}}]);
  const [currentConvo, setCurrentConvo] = useState(0);
  const [header, setHeader] = useState('')
//   const [message, setMessage] = useState({})
  const user = useRecoilValue(UserState);
  let connection;

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

//   const getNewConvo = (input) => {
//         return conversations.map(conversation => {
//             if(conversation.id === input.message.conversation_id){
//                 return {...conversation, messages: [...conversation.messages, input.message]}
//             }
//             return conversation
//         })
//     }

  const handleDataFromConnection = (input) =>{
      alert(input.message)
    // const newConvo = getNewConvo(input)
    // console.log(newConvo)
    // setConversations(newConvo)
    // if(input.message.conversation_id == conversations[currentConvo].id){
    //     setMessage(input.message)
    // }
  }

  useEffect(() => {
    setHeader(conversations[currentConvo].sender.id === user.id ? conversations[currentConvo].recipient.username : conversations[currentConvo].sender.username)
  }, [conversations, currentConvo])

  useEffect(() =>{
    if(conversations[0].sender.username !== ''){
        if(props.location.state) {
            handleConvoClick(props.location.state.idForConvo)
        }
    }
  }, [conversations])

  useEffect(() => {
      if(user){
          createSocket()
      }
  }, [user])

  useEffect(async () => {
    try {
      const res = await axios.get("/conversations");
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
    return () => {
        connection.unsubscribe()
    }
  }, []);

//   const moveToTop = (convoId) => {
//     const sort = conversations.filter(convo => convo.id == convoId);
//     const newConvo = [sort, ...conversations.filter(convo => convo.id !== convoId)];
//     setConversations(newConvo)
//   }

  const handleConvoClick = (e) => {
    // moveToTop(e)
    const convo = conversations.find(conversation => conversation.id === e)
    const index = conversations.indexOf(convo)
    // debugger
    setCurrentConvo(index)
    
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {header}
          </Typography>
        </Toolbar>
      </AppBar>
      <ConversationBar  handleClick={handleConvoClick} user={user} conversations={conversations} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Messages convo={conversations[currentConvo]} user={user}/>
      </main>
    </div>
  );
}
