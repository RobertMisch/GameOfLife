import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
import { produce } from 'immer'
import Cell from './Cell'
import { GridContext } from '../contexts/GridContext'

function Grid() {
    //set up
    // let size=25
    const [speed, setSpeed] = useState(100)
    const [size, setSize] = useState(25)
    const [generation, setGeneration] = useState(0)
    const { grid, setGrid } = useContext(GridContext)
    const [running, setRunning] = useState(false)
    //check into chakra and tailwind

    //Helper functions
    function create2DArray(size) {
        let newArray = []
        console.log(size)
        for (let i = 0; i < size; i++) {
            let col = []
            for (let j = 0; j < size; j++) {
                col.push(0)
            }
            newArray.push(col)
        }
        // console.log(newArray)
        setGrid(newArray) //put in if we go back use effect
        return newArray
    }
    //this currently initializes our 2d array
    useEffect(() => {
        // if (grid.length === 0) {
        create2DArray(size)
        // }
    }, [size])

    function countNeighbors(grid, x, y) {
        let sum = 0
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + sizeRef.current) % sizeRef.current
                let row = (y + j + sizeRef.current) % sizeRef.current
                sum += grid[col][row]
            }
        }
        sum -= grid[x][y]
        return sum
    }
    // console.table(grid) just an edit to test deploy
    //SIMULATION
    //this will make it so a function dosent run multiple times. we just want one simulation up
    const runningRef = useRef(running)
    runningRef.current = running
    const generationRef = useRef(generation)
    generationRef.current = generation
    const sizeRef = useRef(size)
    sizeRef.current = size
    const speedRef = useRef(speed)
    speedRef.current = speed
    const runSimulation = useCallback(() => {
        //to access running, we'll need to make a ref
        if (!runningRef.current) {
            return;
        }
        if (sizeRef === 0) {
            return;
        }
        //simulate
        // console.log('getting here')
        setGeneration(generationRef.current += 1)
        //this creates a grid copy that we can mutate. then after we mutate it we put it into setGrid
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < sizeRef.current; i++) {
                    for (let j = 0; j < sizeRef.current; j++) {
                        let neighbors = countNeighbors(g, i, j);
                        // let neighbors = 0
                        // console.log(neighbors)

                        //if <2 neighbors, die
                        //if alive with 3 neighbors, die
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            //if ===3, and is dead, be alive
                            gridCopy[i][j] = 1
                        }
                    }
                }
            })
        })

        //delay
        setTimeout(runSimulation, speedRef.current)
    }, [])

    function singleStep(){
        setGeneration(generationRef.current += 1)
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < sizeRef.current; i++) {
                    for (let j = 0; j < sizeRef.current; j++) {
                        let neighbors = countNeighbors(g, i, j);
                        // let neighbors = 0
                        // console.log(neighbors)

                        //if <2 neighbors, die
                        //if alive with 3 neighbors, die
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            //if ===3, and is dead, be alive
                            gridCopy[i][j] = 1
                        }
                    }
                }
            })
        })
    }

    function clearGame() {
        setGeneration(0)
        setSpeed(100)
        create2DArray(sizeRef.current)
    }

    function changeSize(change) {
        if ((size + change) >= 0) {
            console.log(size + change)
            setSize(size + change)
            console.log(size)
            clearGame()
        } else {
            setSize(0)
            clearGame()
        }
    }
    function changeSpeed(change){
        if((speed+change)>=1){
            setSpeed(speed+change)
        }else{
            setSpeed(0)
        }
    }
    //random and presets
    function setRandom(){
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < sizeRef.current; i++) {
                    for (let j = 0; j < sizeRef.current; j++) {
                        gridCopy[i][j] = (Math.random() > .5 ? 0 : 1)
                    }
                }
            })
        })
    }
    function preset1(){
        setGrid(
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]]
        )
    }
    function preset2(){
        setGrid(
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]]
        )
    }
    function preset3(){
        setGrid(
            [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]]
        )
    }
    function saveArray(){
        let savedArray=""
        for (let i = 0; i < sizeRef.current; i++) {
            let savedRow="["
            for (let j = 0; j < sizeRef.current; j++) {
                savedRow = savedRow+`${grid[i][j]},`
            }
            savedArray+= savedRow+="],"
        }
        console.log(savedArray)
    }
    

    if (grid !== undefined) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                <div style={{display:'flex'}}>
                    <p>{`generation: ${generation}`}</p>

                    <button onClick={() => {
                        setRunning(!running)
                        if (!running) {
                            runningRef.current = true;
                            runSimulation()
                        }
                    }}>{running ? 'STOP' : 'START'}</button>

                    <button onClick={()=>{if (running) { return } singleStep()}}>Step forward single gen</button>

                    <button onClick={() => {
                        if (running) { return }
                        else { clearGame() }
                    }}>clear game</button>

                    <button onClick={()=>{if (running) { return } saveArray()}}>Save Template</button>
                </div>
                <div style={{display:'flex'}}>
                    <button onClick={() => { if (running) { return } changeSize(-5) }}>-5</button>
                    <button onClick={() => { if (running) { return } changeSize(-1) }}>-1</button>
                    <p>{`Size: ${size}`}</p>
                    <button onClick={() => { if (running) { return } changeSize(1) }}>+1</button>
                    <button onClick={() => { if (running) { return } changeSize(5) }}>+5</button>
                    <button onClick={() => { changeSpeed(-100) }}>-100ms</button>
                    <button onClick={() => { changeSpeed(-50) }}>-50ms</button>
                    <p>{`Speed: 1 gen / ${speed}ms`}</p>
                    <button onClick={() => { changeSpeed(50) }}>+50ms</button>
                    <button onClick={() => { changeSpeed(100) }}>+100ms</button>
                </div>
                <div>
                    <p>presets</p>
                    <button onClick={() => { if (running) { return } setRandom() }}>random</button>
                    <button onClick={() => { if (running) { return } preset1() }}>preset 1</button>
                    <button onClick={() => { if (running) { return } preset2() }}>preset 2</button>
                    <button onClick={() => { if (running) { return } preset3() }}>preset 3</button>
                </div>

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
                                if (running) { return } //can use something like this as a shut off for when running
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[x][y] = grid[x][y] ? 0 : 1
                                })
                                setGrid(newGrid)
                            }
                            }></div>
                        }))
                    })}
                </div>
                <div>
                    <p>ABOUT</p>
                    <p>Rules of the game</p>
                    <ol>
                        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    </ol>
                    <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Click here for more info!</a>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Grid;