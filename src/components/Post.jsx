import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";

export default function Post(props) {
  const [postOpen, setPostOpen] = useState(false);

  const handleClickOpen = () => {
    setPostOpen(true);
  };

  const handleClose = () => {
    setPostOpen(false);
  };

  const dateOption = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const date = new Date(props.post.created_at).toLocaleDateString(
    "en-US",
    dateOption
  );
  const date2 = new Date(props.post.created_at).toLocaleTimeString();

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.post.title}
          secondary={props.post.user.username}
        />
      </ListItem>
      <Divider />
      <PostPopup frontId={props.frontId} remove={props.remove} date={date} open={postOpen} handleClose={handleClose} post={props.post}/>
    </div>
  );
}
