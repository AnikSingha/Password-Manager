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

    let [user, setUser] = useState("")
    let [sessionId, setSessionId] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeRequest('http://localhost:5000/auth/get_cookies', 'GET');
    
                if (response.success) {
                    setUser(response.user);
                    setSessionId(response.session_id);
                }
            } catch (error) {
                
            }
        };
    
        fetchData();
    }, [document.cookie, user, sessionId])

    const login = async (email, password) => {

        try {
            const data = await makeRequest('http://localhost:5000/auth/login', 'POST', { email, password })

            if (data.success) {
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    }

    const register = async (email, password) => {
        try {
            const data = await makeRequest('http://localhost:5000/auth/register', 'POST', { email, password })

            if (data.success) {
                return true
            } else {
                console.error('Registration failed:', data.message)
                return false
            }
        } catch (error) {
            console.error('Registration failed:', error)
            throw error
        }
    }

    const resetPassword = async (email, password) => {
        try {
            const data = await makeRequest('http://localhost:5000/auth/reset_password', 'POST', { email, password })

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

    const logout = async () => {

        try {
            const data = await makeRequest('http://localhost:5000/delete_cookies')
        } catch(error) {
            console.log(error)
        }

        setUser('')
        setSessionId('')
    }

    return (
        <UserContext.Provider value={{ user, sessionId, login, register, resetPassword, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider, makeRequest }
