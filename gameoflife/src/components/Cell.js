import React, { useState } from 'react'

function Cell(props){
    console.log(props.value)
    const [status, setStatus]= useState(props.value)
    let position = [props.x, props.y]
    const history=[]
    let theme='white'
    
    function updateStatus(){
        console.log(status)
        if(status===0){
            setStatus(1)
            theme='black'
        }else{
            setStatus(0)
            theme='white'
        }
    }
    if(status===1){
        theme='black'
    }else{
        theme='white'
    }
    return(
        <div style={
            {
                background: theme, 
                width:'20px', 
                height:'20px',
                border:"1px solid black", 
                margin:'0',
                padding:'0'
            }
        } onClick={()=>{updateStatus()}}></div>
    )
}

export default Cell;