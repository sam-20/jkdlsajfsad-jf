
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { MyContext } from '../store/context'
import { useEffect } from 'react'

function Appliances() {

    // useEffect(() => {
    //     message();


    // })


    const { cartItem, message, updateCartItem } = useContext(MyContext)

    let history = useHistory()

    function openShoesPage() {
        history.push('/shoes')
    } 

    return (

        <div>
            <p>This is the appliances page</p>
            <p>Items in cart : {cartItem}</p>

            <button onClick={updateCartItem}>Add this appliance to cart</button>

            <br />

            <button onClick={openShoesPage}>Navigate to shoes section</button>
        </div>

    )

}


export default Appliances;