import React, { Fragment } from 'react'
import "./input.css"

const Input = ({
    id,
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    label,
    ...props
}) => {
    return (
        <Fragment>
             <label htmlFor={name}>{label}</label>
             <br/>
            <input
                id={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
            />
            <br/>
        </Fragment>
    )
}

export default Input
