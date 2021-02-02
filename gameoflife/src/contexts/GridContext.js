import React, {createContext, Component} from 'react'

export const GridContext = createContext();

// class GridContextProvider extends Component{
//     state ={
//         filler:""
//     }
//     //functions
//     //2d array here?
//     render(){
//         return(
//             <GridContextProvider value={{...this.state}}>
//                 {this.props.children}
//             </GridContextProvider>
//         )
//     }
// }

// export default GridContextProvider;