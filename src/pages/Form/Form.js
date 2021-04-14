import './Form.css'
import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { AccessAlarm, ThreeDRotation, Visibility } from '@material-ui/icons';
import kstu_logo from '../../images/download.png'

function Form() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [values, setValues] = useState({})

    // let history = useHistory();

    // function signup(e) {
    //     console.log(username)
    //     console.log(password)
    //     e.preventDefault()

    //     history.push('/signup')
    // }

    // function signin(e) {
    //     console.log(username)
    //     console.log(password)
    //     e.preventDefault()

    //     history.push('/signin')
    // }

    const onchange = (e) => {
        e.preventDefault()
        setValues({ ...values, [e.target.name]: [e.target.value] })
    }

    function updateUsername(e) {
        // console.log(e)
        // console.log(e.target.value)
        setUsername(e.target.value)

    }

    function updatePassword(e) {
        // console.log(e)
        setPassword(e.target.value)
    }

    // function run() {
    //     var foo = "Foo";
    //     let bar = "Bar";

    //     console.log(foo, bar); // Foo Bar

    //     {
    //         var moo = "Mooo"
    //         let baz = "Bazz";
    //         console.log(moo, baz); // Mooo Bazz
    //     }

    //     console.log(moo); // Mooo
    //     // console.log(baz); // ReferenceError
    // }

    function handleEnter(event) {
        // alert(event.keyCode)
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    function submit(e) {
        e.preventDefault()

        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())    /**fetching json response */
            .then(res => {
                console.log(res);
            }, (err) => {
                console.log(err);
            })
    }

    return (
        <div style={{ background: 'white', height: '100vh', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


            <form className="ourform" style={{ boxShadow: '0px 0px 5px 1px gray', borderRadius: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', borderRadius: 10 }}>

                    <div className="imagediv">
                        <img style={{ width: 100, height: 100 }} src={kstu_logo} alt="alternate" />
                    </div>

                    <div style={{ display: 'flex', flex: 0.2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellows', paddingLeft: 15, paddingRight: 15 }}>
                        <input className="myinput" z placeholder="Username" type="text" onKeyDown={handleEnter} value={username} onChange={updateUsername} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flex: 0.2, backgroundColor: 'greens', paddingLeft: 15, paddingRight: 15 }}>
                        <input type="password" className="myinput" placeholder="Password" value={password} onChange={updatePassword} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', flex: 0.2, alignItems: 'flex-start', backgroundColor: 'blues', paddingLeft: 15, paddingRight: 15 }}>
                        <button className="login_button" onClick={submit} >Login</button>
                    </div>

                </div>
            </form>

        </div>

    )
}

export default Form;