
import React, { createContext, useState } from 'react'



const AppContext = createContext();

function AppProvider(props) {

    const [contextUsername, setContextUsername] = useState('')

    return (
        <AppContext.Provider value={{contextUsername, setContextUsername}}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }