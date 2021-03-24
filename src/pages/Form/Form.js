import './Form.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessAlarm, ThreeDRotation, Visibility } from '@material-ui/icons';
import kstu_logo from '../../images/download.png'

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


            <form className="ourform" style={{ boxShadow: '2px 2px 10px 10px gray', borderRadius: 20 }}>
                {/* <label>Username: </label> <br /> */}
                <div style={{ display: 'flex', flexDirection: 'column', height: 300, width: 230, justifyContent: 'center', borderRadius: 10 }}>


                    <div className="imagediv">
                        <img style={{ width: 70, height: 70 }} src={kstu_logo} alt="alternate" />
                    </div>


                    {/* <div>
                        <input type="text" value={username} onChange={updateUsername} placeholder="Username"
                            // onKeyDown={handleEnter}
                            style={{ boxShadow: '2px -2px 2px 2px gray', border: 'none', marginBottom: 10, borderRadius: 2 }}
                        />
                    </div> */}

                    <div style={{ display: 'flex', justifyContent: 'center', flex: 0.1 }}>
                        <input className="myinput" placeholder="Username" type="text" style={{ boxShadow: '2px -2px 5px 2px gray', borderRadius: 10 }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, flex: 0.1 }}>
                        <input type="password" className="myinput" placeholder="Password" type="text" style={{ boxShadow: '2px -2px 5px 2px gray', borderRadius: 10 }} />
                    </div>

                    <div style={{ display: 'flex', marginTop: 20, justifyContent: 'center', flex: 0.1 }}>
                        <button className="login_button" onClick={(e) => { e.preventDefault() }} >Login</button>
                    </div>



                    {/* <div style={{ display: 'flex', boxShadow: '2px 2px 2px 2px gray', marginLeft: 50, marginRight: 50 }}>
                        <input type="password" value={password} onChange={updatePassword} placeholder="Password"
                            style={{ border: 'none' }}
                        />
                        <Visibility style={{ color: 'gray', }} />
                    </div> */}

                    {/* <a href="#" className="link" >Link</a> */}

                    {/* <div>
                        <button onClick={signin} >Signin</button>
                    </div>

                    <div>
                        <button onClick={signup} >Signup</button>
                    </div> */}

                    {/* <div style={{ backgroundColor: 'dodgerblue', flex: 0.3 }}>
                        <div style={{ backgroundColor: 'yellow', display: 'flex', height: '100%', borderBottomRightRadius: 60 }}>

                        </div>
                    </div>

                    <div style={{ backgroundColor: 'yellow', flex: 0.3 }}>
                        <div style={{ backgroundColor: 'dodgerblue', display: 'flex', height: '100%', borderTopLeftRadius: 60 }}>

                        </div>
                    </div> */}



                </div>
            </form>

            <nav>
                <li>
                    <a href="#">Home</a>
                </li>

                <li>
                    <a href="#">About</a>
                </li>

                <li>
                    <a href="#">Contact</a>
                </li>
            </nav>
        </div>

    )
}

export default Form;