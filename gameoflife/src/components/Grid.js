import React, { useState, useEffect, useContext } from 'react'
import Cell from './Cell'
import { GridContext } from '../contexts/GridContext'

function Grid(){
    const {grid, setGrid}=useContext(GridContext)
    let size = 25
    let generation=0

    function create2DArray(size){
        let newArray = []
        for(let i=0; i<size; i++){
            let col=[]
            for(let j=0; j<size; j++){
                col.push(0)
            }
            newArray.push(col)
        }
        setGrid(newArray)
        return newArray
    }
    useEffect(()=>{
        if(grid.length === 0){
            create2DArray(size)
        }
    },[grid])
    console.table(grid)
    if(grid.length!==0){
        return (
            <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <div style={{display:'grid', gridTemplateColumns:`repeat(${size}, 20px)`, width:'80%'}}>
                    {grid.map((item, x)=>{
                        return (item.map((value, y)=>{
                            console.log(x)
                            return<Cell value={value} x={x} y={y}/>
                        }))
                    })}
                </div>
            </div>
        )
    }else{
        return null
    }
}

export default Grid;