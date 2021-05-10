import React, { useState } from 'react'
import item1 from '../images/download.jpg'
import item2 from '../images/download2.jpg'

function Modal() {

    /**step 1 
     * we create a state variable that will tell whether we should display our modal or not
     * by default we hide our modal hence the initial state is false
    */
    const [showModal, setShowModal] = useState(false)

    /**step 2 
     * we create another state variable to hold the image that the user decides to view in the modal
     * by default there's no image in the modal hence the initial state is nothing
    */
    const [modalImage, setModalImage] = useState()


    /**step 4
     * we create a function that will take the image and set it to the modal's image before
     * we finally open the modal
     */
    function viewItem(image) {
        setModalImage(image)    /**we put this image inside the modal */
        setShowModal(true)      /**then we display our modal */
    }


    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'dodgerblue' }}>


            {/**step 3  we create our modal and tell it to display only when showModal is set to true*/}
            {
                showModal == true ?

                    <div style={{
                        width: '100%', height: '100%', position: 'fixed',
                        zIndex: 100, left: 0, top: 0, background: 'rgb(0,0,0,0.5)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',

                    }}>

                        {/**this is the modal div */}
                        <div style={{
                            borderRadius: 20,
                            display: 'flex', width: '80%', height: '80%',
                            backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <img
                                src={modalImage}
                                style={{ width: '50%', height: '50%' }}
                            />

                            <button onClick={() => { setShowModal(false) }}>close modal</button>
                        </div>

                    </div>
                    /**modal ends here */

                    :
                    null
            }



            {/**cards containing the watch and its price */}
            <div style={{ display: 'flex', width: '20%', height: '40%', backgroundColor: 'white', flexDirection: 'column', marginLeft: 50, marginTop: 100 }}>
                <img src={item1} style={{ width: '100%', height: '85%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Price:  $30</p>
                    <button
                        onClick={() => { viewItem(item1) }} /**step 5 we pass the function to the button that will open the modal and pass the name of the image imported as a parameter */
                        style={{ width: '50%' }}>
                        add to cart
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', width: '20%', height: '40%', backgroundColor: 'white', flexDirection: 'column', marginLeft: 50, marginTop: 100 }}>
                <img src={item2} style={{ width: '100%', height: '85%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Price:  $30</p>
                    <button
                        onClick={() => { viewItem(item2) }}
                        style={{ width: '50%' }}>add to cart </button>
                </div>
            </div>

        </div>
    )
}

export default Modal
