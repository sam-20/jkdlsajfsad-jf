import React, { useState } from 'react'
import ComponentBCSS from './ComponentB.module.css'

function ComponentB() {

    const [popover, setPopover] = useState(false)

    return (
        <div className={ComponentBCSS.body} >

            <p>this is component B</p>

            <button onClick={() => setPopover(!popover)} className={ComponentBCSS.button}>trigger popover</button>

            <div className={popover ? ComponentBCSS.popover_open : ComponentBCSS.popover_closed}>
                <div className={ComponentBCSS.textareadiv}>
                    <textarea className={ComponentBCSS.textarea} placeholder="type message here ..."></textarea>
                </div>

                <div className={ComponentBCSS.sendbuttondiv}>
                    <button className={ComponentBCSS.sendbutton}>send</button>
                </div>
            </div>

        </div>
    )
}

export default ComponentB;