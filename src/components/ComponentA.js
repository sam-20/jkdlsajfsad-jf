import { useHistory, Link, Redirect } from 'react-router-dom'
import React, {  useState } from 'react'

function ComponentA() {

    let history = useHistory();

    function navigateToB() {
        history.push('/second')
    }

    // function myfunc() {
    //     var name = 'sam';
    //     name === 'sam' ? console.log('the name is sam') : console.log('the name is brian')
    // }

    const [credentials_status, setCredentials] = useState(false)

    return (
        <div>
            <p>this is component A</p>
            <button onClick={navigateToB} >open component B using history</button>

            <Link to='/second'>
                <button onClick={() => { alert('hello') }}>open component B using link</button>
            </Link>

            {/* <Redirect to='/second'> */}
            <button>open component B using redirect</button>
            {/* </Redirect> */}

            <button onClick={() => {
                setCredentials(true)
            }}>change kofi to ama</button>


            {
                credentials_status === true ?
                    <Redirect to='/second'></Redirect>
                    :
                    null
            }

        </div>
    )
}

export default ComponentA;