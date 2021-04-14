import React, { useState } from 'react'
import SignupCSS from './Signup.module.css'
import Inputfield from '../Mycomponents/Inputfield/Inputfield'
import Button from '../Mycomponents/Button/Button'


function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setConfpassword] = useState('')


    function signup() {

        try {

            console.log(username);
            console.log(password);
            console.log(confpassword);
            var trimmed_username = username.trim()
            var trimmed_password = password.trim()
            var trimmed_confpassword = confpassword.trim()
            setUsername(trimmed_username)
            setPassword(trimmed_password)
            setConfpassword(trimmed_confpassword)

            if (!(username)) {
                console.log("username field is empty");
            }

            if (!(password)) {
                console.log("password field is empty");
            }

            if (!(confpassword)) {
                console.log("confirm password field is empty");
            }



        } catch (error) {
            console.log(error);
        }

    }

    function updateusername(e) {
        setUsername(e.target.value)
    }

    function updatepassword(e) {
        setPassword(e.target.value)
    }

    function updateconfpassword(e) {
        setConfpassword(e.target.value)
    }


    return (
        <div className={SignupCSS.main}>

            <div className={SignupCSS.formcontainer}>

                <div className={SignupCSS.imagecontainer}>
                    <h1>Sign Up</h1>
                </div>

                <div className={SignupCSS.inputfields_container}>
                    <Inputfield inputfieldtype="text" inputfieldplaceholder="Username" inputfileldname="username" inputfieldvalue={username} inputfieldonchange={updateusername} />

                    <Inputfield inputfieldtype="password" inputfieldplaceholder="Password" inputfileldname="password" inputfieldvalue={password} inputfieldonchange={updatepassword} />

                    <Inputfield inputfieldtype="password" inputfieldplaceholder="Confirm Password" inputfileldname="confpassword" inputfieldvalue={confpassword} inputfieldonchange={updateconfpassword} />
                </div>


                <div className={SignupCSS.buttoncontainer}>

                    <Button text="Sign In" buttonBgColor="dodgerblue" buttonBorder="none" buttonOutline="none" buttonColor="white" buttonPadding="10px 20px" buttonBorderRadius="20px" buttononclick={signup} />

                </div>


            </div>

        </div>
    )
}

export default Signup;
