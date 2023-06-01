import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div>
            <div className={`alert alert-${props.alert.type} role="alert" hover`} style={{height:'60px'}}>{props.alert.message}
            </div>
        </div>
    )
}
