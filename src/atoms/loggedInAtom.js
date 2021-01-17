import {atom} from 'recoil'

const loggedInState = atom({
    key: "loggedInState",
    default: false
});

export default loggedInState;