import React, { useState, useEffect } from 'react'

function Mounting() {

    /**state variables */
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    /**use effect is the function form for component lifecycles in
     * class components ie. ComponentWillMount, ComponentDidMount, 
     * ComponentWillUnmount
     * 
     * NB: you can declare as many useEffect functions as possible 
     * in a single component
     * 
     * every useEffect function with or without array dependencies will always run
     * on the first render of the page
     */


    /**eg. 1 */
    useEffect(() => {
        console.log('eg 1')
    })/**this means that whatever inside this function will 
    be called whenever any state variable changes and eventually causes
    our dom to re-render */


    /**eg. 2 */
    useEffect(() => {
        console.log('eg 2')
    }, [])  /**this means that our component renders only once ie.
    the initial rendering. Any state variable changes will not cause this to 
    run again */


    /**eg. 3 */
    useEffect(() => {
        console.log('eg 3')
    }, [username]) /**this means that our component renders only when the value in the 
    array dependency changes 
    in this case, whatever is inside this function will be called 
    whenever the value of our state variable 'username' changes */


    /**eg. 4 */
    useEffect(() => {
        console.log('eg 4')
    }, [password]) /**this means that our component renders only when the value in the 
    array dependency changes 
    in this case, whatever is inside this function will be called 
    whenever the value of our state variable 'password' changes */



    /**eg. 5 */
    useEffect(() => {
        console.log('eg 5')
    }, [username, password])/**this means that our component renders only renders when either of 
    the values in the array dependency changes 
    in this case, whatever is inside this function will be called 
    whenever the value of our state variable 'username' changes  or the value of our state variable 'password' changes*/


    /**eg. 6 */
    useEffect(() => {
        console.log('eg 6a')

        return () => {
            console.log('eg 6b')
        }
    })/**a return in a useEffect function is used to cancel subscriptions like ComponentWillUnmount in  class components*/

    return (
        <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', height: '100vh',
            flexDirection:'column'
        }}>

            <button onClick={() => { setUsername('samuel') }} >
                Change username state variable
            </button>

            <button onClick={() => { setPassword('snow192') }} >
                Change password state variable
            </button>

        </div>
    )

}

export default Mounting;