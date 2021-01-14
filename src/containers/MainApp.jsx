import React from 'react'
import {useRecoilValue} from 'recoil'
import {userState} from '../App'

export default function MainApp() {

    const checkLogin = () => {
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

