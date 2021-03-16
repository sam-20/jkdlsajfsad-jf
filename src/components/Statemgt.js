import React, { useState } from 'react'

function Statemgt() {

    /**state management we declare variables like this **/

    /******************NOTE ************************/
    //  in the example below
    //  const [count, changeCount] = useState(5)
    //  count: is the name of the state variable
    //  changeCount is the name of the function we want to use when we want to change the value of the count
    //  useState(5) means we're initializing the value of count to 5
    const [count, changeCount] = useState(5)


    //  in the example2  below
    //  const [gender, setGender] = useState('Male')
    //  gender: is the name of the state variable
    //  setGender is the name of the function we want to use when we want to change the value of the gender
    //  useState('Male') means we're initializing the value of gender to 'Male'
    const [gender, setGender] = useState('Male')


    //  in the example3  below
    //  const [num1, setNum1] = useState()
    //  num1: is the name of the state variable
    //  setNum1 is the name of the function we want to use when we want to change the value of the num1
    //  useState() means we're initializing the value of num1 to nothing
    const [num1, setNum1] = useState();



    /**this function takes the value of count and adds 1 to it
     * before assigning it to count again 
     */
    function increase_count() {
        changeCount(count + 1);
    }


    /**this functions changes the value of gender 
     * if the gender is male..it changes to female
     * and if its female it changes it to male
     */
    function change_gender() {

        if (gender === 'Male') {

            //change gender to female
            setGender('Female')

        }

        else {

            //change gender to male
            setGender('Male');
        }

    }



    return (
        <div>

            <p> initial count: {count}</p>

            <button onClick={increase_count} >increase count </button>


            <p>Gender is :  {gender}</p>

            <button onClick={change_gender}>click me to change gender</button>


        </div>
    )
}

export default Statemgt