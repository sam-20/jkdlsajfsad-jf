import { useHistory } from 'react-router-dom'

import { MyContext } from '../store/context'
import { useContext } from 'react'

function Shoes() {

    const { cartItem, updateCartItem } = useContext(MyContext)

    let history = useHistory()

    function openAppliancesPage() {
        history.push('/appliances')
    }

    return (

        <div>
            <p>This is the shoes page</p>
            <p>Items in cart: {cartItem}</p>

            <button onClick={updateCartItem}>Add this shoes to cart</button>

            <br />

            <button onClick={openAppliancesPage}>Navigate to appliance section</button>
        </div>

    )

}


export default Shoes;