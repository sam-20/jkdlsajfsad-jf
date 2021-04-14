
import { createContext, useState } from 'react'

const MyContext = createContext();

const initialState = {
    cartItemA: 0,
}



function MyProvider(props) {

    const [cartItem, setCartItem] = useState(0)

    function updateCartItem() {
        let newitem = cartItem + 1
        setCartItem(newitem)
    }

    function message() {
        console.log('this message is from the context')
    }

    return (
        <MyContext.Provider value={{ cartItem, setCartItem, message, updateCartItem }}>
            {props.children}
        </MyContext.Provider>
    )
}


export { MyContext, MyProvider }


/**reducer function contains state manupulation logic
 * interacts with the state and changes the data
 *
 * action is an oject that: describes the type of change we want to make in our
 * reducer function
 * type: is the type of change that u want to make
 *
 * dispatch function : sends the action (or changes made to the reducer)
 * ie. it goes into the reducer and changes the state based on the particular
 * action we specified
 *
 *
 *
 *
*/