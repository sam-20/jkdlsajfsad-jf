
import {
    createContext, useState,

    useReducer  /**reducer 1 
    we import the useReducer hook from react*/
} from 'react'

const MyContext = createContext();

/**reducer 2
 * create your state variables or functions
 *  which are going to be accessed by the consumer components
 */
const totalCart = 0
function somemessage() {
    console.log('this is a message from the userReducer');
}

/**reducer 3 
 * create a reducer function that is going to interact with the state and
 * update it
 * the reducer function will take 2 arguments. 
 * The first is the state variable which will be accessed by the consumer components
 * the second is the action that would be made to change the state variable
*/
function cartReducer(cartValue, action) {

    switch (action.type) {
        /**we'd be making several changes to our state variable hence we would be
        * switching between the different types of action or changes
        * the 'type' in action.type is not a reserved keyword
        * its rather the word that we'd use in our dispatch to call our action
        * so eg. dispatch({type: 'Add_to_cartitem'}) 
        */

        /**so we define an action or change type and we tell it what to do to our
         * state variable provided as an arg to the reducer function
         */
        case 'Add_to_cartitem':
            return cartValue + 1;

        case 'Remove_from_cartitem':
            return cartValue - 1;

        /**we can also pass down functions in our action type like this */
        case 'Display message from reducer':
            return somemessage(), cartValue;    /**we can also return multiple values 
            NB: whenever a dispatch is called it updates the state value
            hence if we pass something which doesnt make use of the state value
            we still need to return the state value
            else the dispatch will update it with NaN*/

        default: return cartValue;
    }
}

function MyProvider(props) {

    /**reducer 4
     * insider our provider where our data and functions would be passed onto the 
     * consumer components
     * const [newStateValue , functionToUpdateStateValueBasedOnReducerAction] = useReducer (reducerFunction, initialStateValue)
     */

    const [ourTotalCart, dispatch] = useReducer(cartReducer, totalCart)

    const [cartItem, setCartItem] = useState(0)

    function search() {
        console.log(`total cart: ${ourTotalCart}`);
    }

    function updateCartItem() {
        let newitem = cartItem + 1
        setCartItem(newitem)
    }

    function subtractCartItem() {
        let newitem = cartItem - 1
        setCartItem(newitem)
    }

    function message() {
        console.log('this message is from the context')
    }

    return (
        <MyContext.Provider value={{
            cartItem, setCartItem, message, updateCartItem, subtractCartItem, search,

            ourTotalCart, dispatch
        }}>
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