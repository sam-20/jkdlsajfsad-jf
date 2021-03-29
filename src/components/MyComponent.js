import { useEffect, useState } from 'react'

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
            <button onClick={changename}>change the name</button>
            <p>{myname}</p>
            <button onClick={changenumber}>change the nubmer</button>
            {mynumber}

            <button onClick={changeFan}>change fan status</button>
        </div>

    )

}


export default MyComponent