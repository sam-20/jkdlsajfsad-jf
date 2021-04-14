import React from 'react'
import InputfieldCSS from './Inputfield.module.css'

function Inputfield(props) {
    return (
        <input
            className={InputfieldCSS.inputfield}
            type={props.inputfieldtype}
            name={props.inputfileldname}
            value={props.inputfieldvalue}
            placeholder={props.inputfieldplaceholder}
            onChange={props.inputfieldonchange}
        />

    )
}

export default Inputfield
