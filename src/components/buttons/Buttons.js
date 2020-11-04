import React, { Fragment } from "react";
import "./buttons.css"


const Buttons = ({type, className, onClick, label, disabled, ...props }) => {
    return (
        <Fragment>
            <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
            >
                {label}
            </button>
        </Fragment>
    )
}

export default Buttons
