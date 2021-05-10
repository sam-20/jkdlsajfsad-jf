import { useHistory } from 'react-router-dom'
import { MyContext } from '../store/context'
import { useContext } from 'react'

function Shoes() {

    const { cartItem, updateCartItem, subtractCartItem } = useContext(MyContext)

    let history = useHistory()

    function openAppliancesPage() {
        history.push('/appliances')
    }

    return (

        <div>
            <p>This is the shoes page</p>
            <p>Items in cart: {cartItem}</p>

            <button onClick={openAppliancesPage}>Navigate to appliance section</button>

            <br /><br />
            <p>Without using reducer</p>
            <button onClick={updateCartItem}>Add this shoes to cart</button>
            <button onClick={subtractCartItem}>remove this shoes from cart</button>

            <br /><br />

            <p>Using reducer</p>
            <button onClick={updateCartItem}>Add this shoes to cart</button>
            <button onClick={subtractCartItem}>remove this shoes from cart</button>

            <br /><br />

        </div>

    )

}


export default Shoes;