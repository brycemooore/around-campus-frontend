import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoggedInState from "../atoms/loggedInAtom";
import { Redirect } from "react-router-dom";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import logo from "./pexels-ivan-samkov-5676744.jpg";
import { Button, Typography, CardActions } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));

export default function Welcome() {
  const styles = useStyles();

  const loggedIn = useRecoilValue(LoggedInState);

  return (
    <div>
      {loggedIn ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <Card className={cx(styles.root)}>
            <Typography color="primary" variant="h2">
              Welcome to Around Campus
            </Typography>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            />
            <CardContent>
              <TextInfoContent
                // classes={textCardContentStyles}
                overline={"Around Campus"}
                heading={"About"}
                body={
                  "Around Campus is a great way to meet fellow students from your college campus. Make listings promoting clubs, selling books, or seeking hobbies and message fellow students instantly to get connected"
                }
              />
            </CardContent>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Button variant="outlined" color="primary">
                    Sign Up
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button variant="outlined" color="primary">
                    Login
                  </Button>
                </Link>
              </div>
          </Card>
        </div>
      )}
    </div>
  );
}
