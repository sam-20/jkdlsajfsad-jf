
import { useHistory } from 'react-router-dom'

/**context 9
 * in the component where you'd be using context 
 * 1. import useContext from the react package
 * 2. import the context object variable from the context file
 */
import React, { useState, useContext } from 'react'
import { Mycontext } from '../store/context'


function Login() {

    let history = useHistory()

    /**context 10 
     * we need to destructure
     * or extract the values we got from the context
     * u destructure only the ones you need in your component
     * from the context provider
    */
    const { contextUsername, updateContextUsername } = useContext(Mycontext)


    function login() {
        history.push('/dashboard')
    }

    function updateusername(e) {

        /**context 11
         * eg of using a context function
         */
        updateContextUsername(e.target.value)
    }

    return (
        <>

            <p>Login page</p>

            {/**context 11
            * eg of using a context variable
            */}
            <p>context username is : {contextUsername}</p>

            <label>Username</label>
            <input type="text" value={contextUsername} onChange={updateusername} />

            <br />

            <label>Password</label>
            <input type="password" />

            <br />

            <button onClick={login}>login</button>

        </>
    )
}

export default Login;