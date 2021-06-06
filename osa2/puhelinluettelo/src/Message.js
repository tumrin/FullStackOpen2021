import React from 'react'

const Message = ({error}) => {
    if(!error){
        return <></>
    }
    const style = {
        color:error.success?'green':'red',
        fontSize:16,
        borderStyle:'solid',
        padding:5
    }
    return (
        <div style={style}>
            {`${error.operation} ${error.name} `}{error.success?'succesful':'failed, contact already removed from server'}
        </div>
    )
}

export default Message
