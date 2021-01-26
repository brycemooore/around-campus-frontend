import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

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

export default function ConversationBar(props) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Button onClick={() => history.push('/')} color="primary">Home</Button>
      <Divider />
      <List>
        {props.conversations.map((convo, index) => {
          return (
            <div key={index}>
              <ListItem button onClick={() => props.handleClick(convo.id)}>
                <ListItemText
                  primary={
                    convo.sender.id === props.user.id
                      ? convo.recipient.username
                      : convo.sender.username
                  }
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Drawer>
  );
}
