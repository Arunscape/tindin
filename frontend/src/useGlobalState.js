import React, { createContext, useReducer, useContext } from 'react';

const GlobalStateContext = createContext();

const initialState = {
    loggedIn: false,
    user: {
        email: null
    }
}

const globalStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGGEDIN':
            return {
                ...state,
                loggedIn: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return <GlobalStateContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalStateContext.Provider>

}

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setLoggedIn = (val) => dispatch({ type: 'SET_LOGGEDIN', payload: val })
    const setUser = (user) => dispatch({ type: 'SET_USER', payload: user })

    return {
        setLoggedIn,
        setUser,
        loggedIn: state.loggedIn,
        user: state.user
    }
}

export default useGlobalState;