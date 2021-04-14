import { useState } from 'react'


function Maincomponent(props) {

    const [myname, changemyname] = useState('samuel')
    const [num1, setNum1] = useState(5)
    const [fan, setFanstatus] = useState()

    function changeName() {
        changemyname('daniel')
    }


    function updatenumber() {
        var newnum = num1 + 1
        setNum1(newnum)
    }


    function updatefanstatus() {
        setFanstatus('on')
    }

    return (
        <div >
            This is the maincomponent screen

            <p>My name is myname</p> <br />
            <p>My name is {myname}</p> <br />

            <p>{num1}</p> <br />

            <p>{fan}</p>

            <button onClick={changeName} >Change the name</button>
            {/* <button onClick={alert('button clicked!')} >Change the name</button> */}

            <button onClick={updatenumber} >Change the number</button>
            <button onClick={updatefanstatus} >Change the fan status</button>

            {/* <MyComponent vegetable = 'tomato'/> */}
        </div>
    )
}

export default Maincomponent;