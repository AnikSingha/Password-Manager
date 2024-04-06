import { createContext, useState } from "react"

const UserContext = createContext()

function UserProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, username, setUsername}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}