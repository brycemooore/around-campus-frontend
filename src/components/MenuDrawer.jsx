import React from "react";
import { Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useSetRecoilState} from 'recoil'
import LoggedInState from '../atoms/loggedInAtom'

export default function MenuDrawer(props) {

    const setLoggedIn = useSetRecoilState(LoggedInState)

    const handleLogout = () => {
        localStorage.clear()
        setLoggedIn(false)
        props.toggle()
    }
  return (
    <div>
      <Drawer anchor="right" open={props.menuOpen} onClose={props.toggle}>
        <List style={{ width: "20vw" }}>
          <ListItem button key={"profile"}>
            <ListItemText primary={"Profile"} color="primary" />
          </ListItem>
          <ListItem button key={"logout"} onClick={handleLogout}>
            <ListItemText primary={"Logout"} color="primary" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
