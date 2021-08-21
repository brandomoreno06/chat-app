import React, { createContext, useContext, useReducer} from 'react';


const UserContext = createContext();

export const UserProvider = ({initialState, reducer, children}) => {
    const valueUserProvider = useReducer(reducer, initialState);
    
    return(
        <UserContext.Provider value={valueUserProvider} >
            {children}
        </UserContext.Provider>
    )
}

export const useStateValue = () => useContext(UserContext);
