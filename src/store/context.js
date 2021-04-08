

import React, { useState } from 'react'


/**context 1
 * create the context file and import createContext from react*/
import { createContext } from 'react'

/**context 2
 * create a variable that is going to store the created context object
 */
const Mycontext = createContext()


/**context 3 
 * create your provider component which is going to be wrapped around the 
 * entire app
 * items passed through the value prop would be made accesible or
 * passed down to all the 
 * app's components through the props.children
 */
function MyProvider(props) {


    /**context 7
     * create ur usual functions and state variables like the normal routine in 
     * other components
     * these state variables and functions would be passed down to all other
     * components in the app through the value prop in the return section
     */
    const [contextUsername, setContextUsername] = useState('')

    function updateContextUsername(name) {
        setContextUsername(name)
    }


    return (

        /**inside the return is we're going to use the 
         * provider key or option given to us from our created context object
         */
        <Mycontext.Provider value={{ contextUsername, updateContextUsername }} >     {/**context 8 
         * pass the functions and state variables created through the value prop
         */}
            {props.children}
        </Mycontext.Provider>
    )

}


/**context 4
 * export the variable which contains the context object 
 * and the provider component
 */
export { Mycontext, MyProvider };