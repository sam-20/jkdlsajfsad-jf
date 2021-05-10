import React, { useState } from 'react'
import ComponentECSS from './ComponentE.module.css'

function ComponentE() {

    const [showpopup, setShowpopup] = useState(false)

    console.log(showpopup);

    function popupmode() {
        // if (showpopup == true) {
        //     setShowpopup(false)
        // }
        // else {
        //     setShowpopup(true)
        // }

        setShowpopup(!(showpopup))
    }

    return (
        <div className={ComponentECSS.body}>


            <button className={ComponentECSS.button} onClick={popupmode}>toggle popup</button>

            <div className={showpopup ? ComponentECSS.popup : ComponentECSS.popclosed}>


            </div>
        </div>
    )
}

export default ComponentE
