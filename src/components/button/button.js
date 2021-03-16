
function Button (props){

    return(
        <button
            style={{
                backgroundColor:'red',
                color:props.customizecolor,
                width:100,
                height:props.customizeheight,
                borderRadius:5,
                boxShadow:'2px 2px 2px',
                borderStyle:'dotted'
    }}>
            {props.textinsidebutton}
            </button>
    )
}

export default Button;