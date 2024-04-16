import { createContext, useEffect, useState } from "react"

const UserContext = createContext()

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
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
            const data = await makeRequest('https://pass.aniksingha.com/auth/login', 'POST', { email, password })

            if (data.success) {
                console.log("check cookies")
                console.log(document.cookie)
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    }

    const register = async (email, password) => {
        try {
            const data = await makeRequest(' http://127.0.0.1:5000/auth/register', 'POST', { email, password })

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
