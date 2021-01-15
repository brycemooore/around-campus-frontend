import axios from 'axios'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {userState} from '../App'

export default function MainApp() {

    const checkLogin = () => {
    //    fetch('http://localhost:3001/anything', {credentials: 'include'})
    //    .then(res => res.json())
    //    .then(console.log)
    //     debugger
    }

    const user = useRecoilValue(userState)

    return (
        <div onClick={checkLogin}>
            <button onClick={checkLogin}>Hello</button>
            <div>
                {user.username}
            </div>
        </div>
    )
}

