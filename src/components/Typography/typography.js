function Typography(props) {

    return (
        <p style={{ color: props.mytypographycolor, fontSize: 20 }}>
            {props.text}
        </p>
    )
}

export default Typography