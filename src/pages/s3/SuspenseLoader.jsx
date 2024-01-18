import React from "react";

const SuspenseLoader = () => {
    const loaderStyles = {
        width:"100%",
        height:"100%",
        color:"white",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"3rem",
        fontWeight:"500"
    }
    return (
        <div>
        <p style={loaderStyles}>Loading...</p>
        </div>
    )
}

export default SuspenseLoader;