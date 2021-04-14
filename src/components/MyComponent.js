import { useEffect, useState } from 'react'
import Mycss from './MyComponent.module.css'


function MyComponent() {

    const [myname, setMyname] = useState()
    const [mynumber, setMynumber] = useState(7);
    const [fan, setFanstatus] = useState(false);

    useEffect(() => {
        console.log('example 1')
    })

    useEffect(() => {
        console.log('example2')
    }, [])

    useEffect(() => {
        console.log('example3')
    }, [myname])

    useEffect(() => {
        console.log('example4')
    }, [myname, mynumber])

    function changename() {
        setMyname('daniel')
    }

    function changenumber() {
        setMynumber(10)
    }

    function changeFan() {
        setFanstatus(true)
    }

    return (
        <div>
            {/* {Mycss.button1-control} */}
            <button className={Mycss.button1_control} onClick={changename}>change the name</button>
            <p>{myname}</p>
            <button onClick={changenumber}>change the nubmer</button>
            {mynumber}

            <p className={Mycss.sampletext}> this is some text</p>

            <button onClick={changeFan}>change fan status</button>
            {fan}
        </div>

    )

}


export default MyComponent