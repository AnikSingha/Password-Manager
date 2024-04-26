import { createContext, useEffect, useState} from "react"

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

    const [user, setUser] = useState("")
    const [sessionId, setSessionId] = useState("")

    const getCookies = async () => {
        try {
            const response = await makeRequest('http://localhost:5000/auth/get_cookies', 'GET');

            if (response.success) {
                setUser(response.user);
                setSessionId(response.session_id);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getCookies()
        };
    
        fetchData();
    }, [user, sessionId])

    const login = async (email, password) => {

        try {
            const data = await makeRequest('http://localhost:5000/auth/login', 'POST', { email, password })

            if (data.success) {
                await getCookies()
            
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
                await getCookies()
               
            } else {
                console.error('Registration failed:', data.message)
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
            const data = await makeRequest('http://localhost:5000/auth/delete_cookies', 'DELETE')

            setUser('')
            setSessionId('')

            if (data.success) {
                return true
            } else {
                return false
            }
        } catch(error) {
            console.log(error)
            return false
        } 
    }

    const validateSession = async () => {
        try {
            const data = await makeRequest('http://localhost:5000/auth/verify_session', 'POST', {sessionId})

            if (data.success) {
                return true
            }
            else {
                await makeRequest('http://localhost:5000/auth/delete_cookies', 'DELETE')
                return false
            }
        } catch (error) {
            console.error(error)
            return False
        }
    }

    return (
        <UserContext.Provider value={{ user, sessionId, login, register, resetPassword, logout, getCookies, validateSession}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider, makeRequest }
