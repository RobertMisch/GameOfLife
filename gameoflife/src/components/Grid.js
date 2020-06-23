import React, { useState } from 'react'
import cell from './Cell'
import Cell from './Cell'

function Grid(){
    [myGrid, setMyGrid]=useState([])
    let size = 25
    function create2DArray(size){
        let newArray = []
        for(let i=0; i<size; i++){
            let col=[]
            for(let j=0; j<size; j++){
                col.push(<Cell/>)
            }
            newArray.push(col)
        }
        setMyGrid(newArray)
        return newArray
    }
    console.table(create2DArray(size))
    // console.log(create2DArray(5)[1][1])
    return null
}

export default Grid;