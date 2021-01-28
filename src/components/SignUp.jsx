import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useRecoilState } from "recoil";
import userState from "../atoms/userAtom";
import { useHistory } from "react-router-dom";
import LoggedInState from "../atoms/loggedInAtom";
import { Link as LinkTo } from "react-router-dom";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const schoolOptions = [
  { name: "Virgina Tech", id: 1 },
  { name: "University of Virgina", id: 2 },
  { name: "George Mason University", id: 3 },
  { name: "Virgina Commonwealth University", id: 4 },
  { name: "Christopher Newport University", id: 5 },
  { name: "Old Dominion University", id: 6 },
];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/brycemooore"
        target="_blank"
      >
        Bryce Moore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const genMenu = () => {
  return schoolOptions.map((school, index) => {
    return <MenuItem key={index} value={school}>{school.name}</MenuItem>;
  });
};

export default function SignUp() {
  const classes = useStyles();
  const url =
    "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=ymqihdnx7ieey1qPngyPSaKSo8gFLOTyKsgImKpU";
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [stateUser, setUser] = useRecoilState(userState);
  const [schoolId, setSchoolId] = useState()
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useRecoilState(LoggedInState);
  let count = 0;
  const [options, setOptions] = useState([]);
  const [form, setForm] = useState('School')

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(stateUser);
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: password,
      password_confirmation: password_confirmation,
    };

    try {
      const res = await axios.post("/signup", { user, school_id: schoolId });
      debugger;
      setUser({ ...res.data.user });
      localStorage.token = res.data.jwt;
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.jwt;
      setLoggedIn(true);
      history.push("/home");
    } catch (error) {
      console.log(error.response.data);
      setErrors({ ...error.response.data });
    }
  };

  const schools = async (e) => {
    if (count === 5) {
      count = 0;
      const string = e.target.value;
      string.replace(" ", "%20");
      console.log(string);
      const newUrl = url + "&school.name=" + string + "&_fields=school.name,id";
      if (string === "") return;
      fetch(newUrl)
        .then((res) => res.json())
        .then(setOptions);
    } else {
      count++;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.first_name}
                helperText={!!errors.first_name ? errors.first_name[0] : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.last_name}
                helperText={!!errors.last_name ? errors.last_name[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Schools</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form ? form.name : ''}
                  onChange={(e) => {
                    setForm(e.target.value)
                    setSchoolId(e.target.value.id)
                  }
                }
                >
                  {genMenu()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="username"
                id="username"
                autoComplete="current-username"
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={!!errors.username ? errors.username[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={!!errors.email ? errors.email[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={!!errors.password ? errors.password[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
                id="password_confirmations"
                autoComplete="current-password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={!!errors.password_confirmation}
                helperText={
                  !!errors.password_confirmation
                    ? errors.password_confirmation[0]
                    : null
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitForm}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkTo style={{ textDecoration: "none" }} to="/login">
                <Link variant="body2">{"Already have an account? Login"}</Link>
              </LinkTo>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
