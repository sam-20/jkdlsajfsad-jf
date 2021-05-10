import { useHistory } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MyContext } from '../store/context'

function Appliances() {

    const {
        cartItem, message, updateCartItem, subtractCartItem, search,

        ourTotalCart, dispatch
    } = useContext(MyContext)

    let history = useHistory()

    useEffect(() => {

        /**reducer 5 
         * call an action from the reducer function */
        dispatch({ type: 'Display message from reducer' })

    }, [])

    function openShoesPage() {
        history.push('/shoes')
    }

    return (

        <div>
            <p>This is the appliances page</p>

            <button onClick={openShoesPage}>Navigate to shoes section</button>

            <br /><br />
            <p>Without using reducer</p>
            <p>Items in cart : {cartItem}</p>
            <button onClick={updateCartItem}>Add this appliance to cart</button>
            <button onClick={subtractCartItem}>Remove this appliance from cart</button>

            <br /><br />

            <p>Using reducer</p>
            <p>Items in cart : {ourTotalCart}</p>

            {/**reducer 5 
             * call an action from the reducer function*/}
            <button onClick={() => { dispatch({ type: 'Add_to_cartitem' }) }}>Add this appliance to cart</button>
            <button onClick={() => { dispatch({ type: 'Remove_from_cartitem' }) }}>Remove this appliance from cart</button>

            <br /><br />

        </div>

    )

}


export default Appliances;