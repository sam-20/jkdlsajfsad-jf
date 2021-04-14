import React from 'react'
import SigninCSS from './Signin.module.css'
import Inputfield from '../Mycomponents/Inputfield/Inputfield'
import Button from '../Mycomponents/Button/Button'

function Signin() {
    return (
        <div className={SigninCSS.main}>

            <div className={SigninCSS.formcontainer}>

                <div className={SigninCSS.imagecontainer}>
                    <h1>Sign In</h1>
                </div>

                <div className={SigninCSS.inputfields_container}>
                    <Inputfield inputfieldtype="text" inputfieldplaceholder="Username" inputfileldname="username" inputfieldvalue="" inputfieldonchange="" />

                    <Inputfield inputfieldtype="password" inputfieldplaceholder="Password" inputfileldname="password" inputfieldvalue="" inputfieldonchange="" />
                </div>


                <div className={SigninCSS.buttoncontainer}>

                    <Button text="Sign In" buttonBgColor="dodgerblue" buttonBorder="none" buttonOutline="none" buttonColor="white" buttonPadding="10px 20px" buttonBorderRadius="20px" /> 

                </div>


            </div>

        </div>
    )
}

export default Signin
