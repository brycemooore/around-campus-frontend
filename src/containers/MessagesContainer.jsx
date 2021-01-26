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
  const [loading, setLoading] = useState(true)
  const user = useRecoilValue(UserState);
  let connection;

  const createSocket = () => {
    const cable = ActionCable.createConsumer(
      "ws://localhost:3001/cable"
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
    console.log(connection)
  };

  const findConvoById = (id) => {
    let key
    conversations.find((conversation, index) => {
      if (conversation.id === id){
        key = index
        return true
      } else{
        return false
      }
  })
  return key;
}


const handleDataFromConnection = (input) =>{
  const index = findConvoById(input.message.conversation_id)
  let tempConvo = conversations[index]
  let temp = [...tempConvo.messages, input.message]
  let tempConvos = conversations.slice()
  tempConvos[index].messages = temp 
  setConversations(tempConvos)
}

  useEffect(() => {
    setHeader(conversations[currentConvo].sender.id === user.id ? conversations[currentConvo].recipient.username : conversations[currentConvo].sender.username)
  }, [currentConvo])

  useEffect(() =>{
    if(conversations[0].sender.username !== ''){
        if(props.location.state) {
            handleConvoClick(props.location.state.idForConvo)
        }
        if(user && !loading){
          console.log(!connection)
          if(!connection){
            createSocket()
            console.log(!connection)
          } 
      }
    }
    setHeader(conversations[currentConvo].sender.id === user.id ? conversations[currentConvo].recipient.username : conversations[currentConvo].sender.username)
    setLoading(false)
  }, [conversations])

  useEffect(async () => {
    try {
      const res = await axios.get("/conversations");
      setConversations(res.data);
    } catch (error) {
      console.log(error);
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
    console.log(connection)
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
