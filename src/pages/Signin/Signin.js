import React, { useState } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import './Signin.css'

function Signin() {

    let history = useHistory()
    const [username, setUsername] = useState('')

    function change() {
        setUsername('samuel')
    }

    function pushmethod() {
        username === 'samuel' ? history.push('/signup') : alert('username not changed');
    }


    return (
        <div>
            <p>This is the signin page</p>

            <button className="button" onClick={change}>change username</button>

            <button onClick={pushmethod} >history push signup page</button>

            <Link to='/signup'>
                <button>link to signup page</button>
            </Link>

            {/* <Redirect to='/signup'> */}
            <button>redirect to signup page</button>
            {/* </Redirect> */}

            {
                username === 'samuel' ?
                    <Redirect to='/signup' />
                    :
                    <p>username has not been changed</p>
            }

        </div>
    )
}


export default Signin;