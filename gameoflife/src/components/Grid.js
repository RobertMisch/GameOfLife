import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
import { produce } from 'immer'
import Cell from './Cell'
import { GridContext } from '../contexts/GridContext'

function Grid() {
    let size = 25
    const [generation, setGeneration] = useState(0)
    //set up
    const {grid, setGrid} = useContext(GridContext)
    const [running, setRunning] = useState(false)

    //functions
    function create2DArray(size) {
        let newArray = []
        for (let i = 0; i < size; i++) {
            let col = []
            for (let j = 0; j < size; j++) {
                col.push(0)
            }
            newArray.push(col)
        }
        setGrid(newArray) //put in if we go back use effect
        return newArray
    }
    function countNeighbors(grid, x, y) {
        let sum = 0
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + size) % size
                let row = (y + j + size) % size
                sum += grid[col][row]
            }
        }
        sum -= grid[x][y]
        return sum
    }
    //this currently initializes our 2d array
    useEffect(() => {
        if (grid.length === 0) {
            create2DArray(size)
        }
    }, [])
    // console.table(grid)
    //this will make it so a function dosent run multiple times. we just want one simulation up
    const runningRef = useRef(running)
    runningRef.current = running
    const generationRef = useRef(generation)
    generationRef.current = generation
    const runSimulation = useCallback(() => {
        //to access running, we'll need to make a ref
        if (!runningRef.current) {
            return;
        }
        //simulate
        // console.log('getting here')
        setGeneration(generationRef.current+=1)
        //this creates a grid copy that we can mutate. then after we mutate it we put it into setGrid
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        let neighbors = countNeighbors(g, i, j);
                        // let neighbors = 0
                        // console.log(neighbors)

                        //if <2 neighbors, die
                        //if alive with 3 neighbors, die
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j]=0
                        }else if(g[i][j] === 0 && neighbors === 3){
                            //if ===3, and is dead, be alive
                            gridCopy[i][j]=1
                        }
                    }
                }
            })
        })

        //delay
        setTimeout(runSimulation, 100)
    }, [])

    if (grid !== undefined) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                <p>{`generation: ${generation}`}</p>
                <button onClick={() => { 
                    setRunning(!running)
                    if(!running){
                        runningRef.current=true;
                        runSimulation()
                    }}}>{running ? 'STOP' : 'START'}</button>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 20px)`, width: '80%' }}>
                    {grid.map((rows, x) => {
                        return (rows.map((value, y) => {
                            return <div key={[x, y]} style={
                                {
                                    backgroundColor: grid[x][y] ? "black" : undefined,
                                    width: '19px',
                                    height: '19px',
                                    border: "1px solid black",
                                    margin: '0',
                                    padding: '0'
                                }
                            } onClick={() => {
                                if(running){return} //can use something like this as a shut off for when running
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[x][y] = grid[x][y] ? 0 : 1
                                })
                                setGrid(newGrid)
                            }
                            }></div>
                        }))
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Grid;