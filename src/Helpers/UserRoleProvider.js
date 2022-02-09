import React,{ createContext, useState} from "react";


import { getItem } from '../Utils/sessionStorage';
import LSConstants from '../Constants/SessionStorage';

const { TOKEN } = LSConstants;


export const UserRoleContext = createContext()

export const UserRoleProvider = ({ children }) => {

    let userrole
    const user  = getItem(TOKEN)
    if (user === null || user.length === 0){
        userrole = ''
    }else{
        let text = user.split(" ")
        userrole = text[1]
    }

    const [userRole, setUserRole] = useState(userrole)

    return (
        <UserRoleContext.Provider value={{userRole, setUserRole}}>
            {children}
        </UserRoleContext.Provider>
        
    )
}
