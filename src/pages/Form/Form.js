import './Form.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessAlarm, ThreeDRotation, Visibility } from '@material-ui/icons';

function Form() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();

    function signup(e) {
        console.log(username)
        console.log(password)
        e.preventDefault()

        history.push('/signup')
    }

    function signin(e) {
        console.log(username)
        console.log(password)
        e.preventDefault()

        history.push('/signin')
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

    function run() {
        var foo = "Foo";
        let bar = "Bar";

        console.log(foo, bar); // Foo Bar

        {
            var moo = "Mooo"
            let baz = "Bazz";
            console.log(moo, baz); // Mooo Bazz
        }

        console.log(moo); // Mooo
        // console.log(baz); // ReferenceError
    }

    // function handleEnter(event) {
    //     alert(event.keyCode)
    //     if (event.keyCode === 13) {
    //         const form = event.target.form;
    //         const index = Array.prototype.indexOf.call(form, event.target);
    //         form.elements[index + 1].focus();
    //         event.preventDefault();
    //     }
    // }

    return (
        <div style={{ background: 'white', height: '100vh', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


            <form style={{ boxShadow: '2px -2px 15px 10px dodgerblue', borderRadius: 20 }}>
                {/* <label>Username: </label> <br /> */}
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', height: 300, width: 200, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }}>
                    <div>
                        <input type="text" value={username} onChange={updateUsername} placeholder="Username"
                            style={{ boxShadow: '2px -2px 2px 2px gray', border: 'none', marginBottom: 10, borderRadius: 2 }}
                        />
                    </div>


                    <div style={{ display: 'flex', boxShadow: '2px 2px 2px 2px gray', marginLeft: 50, marginRight: 50 }}>
                        <input type="password" value={password} onChange={updatePassword} placeholder="Password"
                            style={{ border: 'none' }}
                        />
                        <Visibility style={{ color: 'gray', }} />
                    </div>



                    <div>
                        <button onClick={signin} >Signin</button>
                    </div>

                    <div>
                        <button onClick={signup} >Signup</button>
                    </div>

                    {/* <p>Your username is : {username} </p>
                <p>Your password is : {password} </p> */}
                </div>
            </form>

        </div>
    )
}

export default Form;