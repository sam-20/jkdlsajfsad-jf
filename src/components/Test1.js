import React, { useState } from 'react'

function Test1() {

    let num1 = 5;
    num1 = 10
    console.log(num1)

    let myname = 'samuel'
    myname = 'king'

    var [num2, changeNum1] = useState(5)
    var [myname2, changeName] = useState()


   function  change(){
        changeName('King')
    }

    return (
        <div>


            {/* num2 is : {num2} */}
            <p>my name is : {myname2}</p>

            <button onClick={change} >change the name </button>
        </div>
    )

}


export default Test1