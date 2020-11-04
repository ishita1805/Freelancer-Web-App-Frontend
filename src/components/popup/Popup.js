import React from 'react'
import "./popup.css"
const Popup = ({label,onClick,children, ...props}) => {
    return (
        <div className="pop-up-container">
            <div className="pop-up-white-card">
                <div className="popup-cross" onClick={onClick}><i class="fa fa-times" aria-hidden="true"></i></div>
                <h3>{label}</h3>
                {children}
            </div>
            
        </div>
    )
}

export default Popup
