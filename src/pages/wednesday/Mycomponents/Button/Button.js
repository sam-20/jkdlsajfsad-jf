import React from 'react'
import ButtonCSS from './Button.module.css'

function Button(props) {
    return (
        <div>
            <button
                onClick={props.buttononclick}
                style={{
                    backgroundColor: props.buttonBgColor,
                    border: props.buttonBorder,
                    outline: props.buttonOutline,
                    color: props.buttonColor,
                    padding: props.buttonPadding,
                    borderRadius: props.buttonBorderRadius
                }}>
                {props.text}</button>
        </div>
    )
}

export default Button
