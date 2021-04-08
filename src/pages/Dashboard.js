
/**context 9
 * in the component where you'd be using context 
 * 1. import useContext from the react package
 * 2. import the context object variable from the context file
 */
import React, { useContext } from 'react'
import { Mycontext } from '../store/context'


function Dashboard() {


    /**context 10 
     * we need to destructure
     * or extract the values we got from the context
     * u destructure only the ones you need in your component
     * from the context provider
    */
    const { contextUsername } = useContext(Mycontext)

    return (
        <>

            <p>this is the dashboard page</p>

            {/**context 11
            * eg of using a context variable
            */}
            <p>Your username is : {contextUsername}  </p>

        </>
    )
}

export default Dashboard;