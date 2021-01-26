
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import userState from '../atoms/userAtom'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function PostPopup(props) {
  const history = useHistory()
  const user = useRecoilValue(userState)

  const handleMessages = async () => {
    try{
      const res = await axios.get('/conversations/' + props.post.user.id)
      console.log(res.data)
      props.handleClose()
      history.push({
        pathname: '/messages',
        state: {
          idForConvo: res.data[0].id
        }
      });
    }
    catch(errors){
      console.log(errors)
    }
  }

  const handleDelete = async() => {
    const res = await axios.delete('posts/' + props.post.id)
    console.log(props.frontId)
    props.remove(props.frontId)
    props.handleClose()
  }

  return (
    <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle color="primary" id="customized-dialog-title" onClose={props.handleClose}>
          {props.post.title}
        </DialogTitle>
        <DialogContent  style={{minWidth: "50vw"}} dividers>
          <Typography gutterBottom>
            {props.post.user.username}
          </Typography>
          <Typography gutterBottom>
          {props.date}
          </Typography>
          <Typography gutterBottom>
           {props.post.body}
          </Typography>
        </DialogContent>
        <DialogActions>
          {(props.post.user.id === user.id ? 
          <Button autoFocus onClick={handleDelete} color="primary">
            Delete
          </Button> :
          <Button autoFocus onClick={handleMessages} color="primary">
            Message
          </Button> )}
        </DialogActions>
      </Dialog>
    </div>
  );
}