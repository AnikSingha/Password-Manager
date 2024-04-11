import { createContext, useEffect, useState } from "react"

const UserContext = createContext()

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Request failed:', error)
        return { success: false, message: 'Request failed' }
    }
}

function UserProvider({ children }) {

    let [state, setState] = useState({isLoggedIn: false, username: ""})

    const setUserState = ({ isLoggedIn, username }) => {
        localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
        localStorage.setItem("username", username);
        setState({ isLoggedIn, username });
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
        const username = localStorage.getItem('username') || ""

        if (isLoggedIn) { 
            setUserState({isLoggedIn, username})
        }
    }, [])

    const login = async (email, password) => {

        try {
            const data = await makeRequest('http://174.138.49.160/auth/login', 'POST', { email, password })

            if (data.success) {
                setUserState({isLoggedIn: true, username: email})
            } else {
                console.error(data.message)
                throw new Error(data.message)
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const register = async (email, password) => {
        try {
            const data = await makeRequest('http://174.138.49.160/auth/register', 'POST', { email, password })

            if (data.success) {
                return true
            } else {
                console.error('Registration failed:', data.message)
                return false
            }
        } catch (error) {
            console.error('Registration failed:', error)
            return false
        }
    }

    const resetPassword = async (email, password) => {
        try {
            const data = await makeRequest('http://174.138.49.160/auth/reset_password', 'POST', { email, password })

            if (data.success) {
                return true
            } else {
                console.error('Password reset failed:', data.message)
                return false
            }
        } catch (error) {
            console.error('Password reset failed:', error)
            return false
        }
    }

    const logout = () => {
        setUserState({isLoggedIn: false, username: ""})
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
    }

    return (
        <UserContext.Provider value={{ state, login, register, resetPassword, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider, makeRequest }
