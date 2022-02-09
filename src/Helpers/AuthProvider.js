import React, { createContext, useState } from 'react';

import { getItem } from '../Utils/sessionStorage';
import LSConstants from '../Constants/SessionStorage';

const { TOKEN } = LSConstants;

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const token  = getItem(TOKEN)
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);


    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}