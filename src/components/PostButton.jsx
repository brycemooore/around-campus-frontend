import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed"
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function PostButton(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const post = {
        title: title,
        body: body,
        user_id: props.user.id
    }
    
    try{
        const res = await axios.post('/posts', post)
        props.addPost(res.data)
        handleClose()
    }
    catch(error){
        setErrors(error.response.data)
    }
  }

  return (
    <div className={classes.root}>
      <Fab onClick={handleClickOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Make a post seeking or offering and help from fellow students from " + (props.user.school ? props.user.school.name : "around campus") + "!"}
          </DialogContentText>
          <TextField
            autoFocus
            id="title"
            label="Title"
            type="title"
            fullWidth
            required
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={(!!errors.title ? errors.title[0] : null)}
          />
          <TextField
            autoFocus
            multiline
            rows={2}
            rowsMax={6}
            margin="dense"
            id="name"
            label="Body"
            type="body"
            fullWidth
            required
            onChange={(e) => setBody(e.target.value)}
            error={!!errors.body}
            helperText={(!!errors.body ? errors.body[0] : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}
