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

export default function MessagesContainer() {
  const classes = useStyles();
  const [conversations, setConversations] = useState([{messages: [], sender: {username: ''}, recipient:{username: ''}}]);
  const [currentConvo, setCurrentConvo] = useState(0);
  const [header, setHeader] = useState('')
  const user = useRecoilValue(UserState);

  useEffect(() => {
    setHeader(conversations[currentConvo].sender.id == user.id ? conversations[currentConvo].recipient.username : conversations[currentConvo].sender.username)
  }, [conversations])
 

  useEffect(async () => {
    try {
      const res = await axios.get("/conversations");
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      <ConversationBar user={user} conversations={conversations} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Messages convo={conversations[currentConvo]} user={user}/>
      </main>
    </div>
  );
}