import React from 'react'
import classes from './alertModal.module.css'

const AlertModal = (props) => {

    let theAlert

    switch(props.type) {
        case 'success':
            theAlert = classes.alertSuccess
            break
        case 'info':
            theAlert = classes.alertInfo
            break
        case 'failure':
            theAlert = classes.alertFailure
            break
        default:
            theAlert = classes.alertSuccess
    }

    return (
        <div className={classes.backdrop}>
            <div className={`${classes.alert} ${theAlert}`}>
                {props.message}
                <i onClick={props.clicked} className="fas fa-window-close fa-3x"></i>
            </div>
            
        </div>
    )
}

export default AlertModal