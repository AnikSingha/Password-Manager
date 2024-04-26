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
            const response = await makeRequest('https://pass.aniksingha.com/auth/get_cookies', 'GET');

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
            const data = await makeRequest('https://pass.aniksingha.com/auth/login', 'POST', { email, password })

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
            const data = await makeRequest('https://pass.aniksingha.com/auth/register', 'POST', { email, password })

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
            const data = await makeRequest('https://pass.aniksingha.com/auth/reset_password', 'POST', { email, password })

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
            const data = await makeRequest('https://pass.aniksingha.com/auth/delete_cookies', 'DELETE')

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
            const data = await makeRequest('https://pass.aniksingha.com/auth/verify_session', 'POST', {sessionId})

            if (data.success) {
                return true
            }
            else {
                await makeRequest('https://pass.aniksingha.com/auth/delete_cookies', 'DELETE')
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const addAccount = async(email, website, password) => {
        try {
            const data = await makeRequest("https://pass.aniksingha.com/password_management/add_account", "POST", {email, website, password})

            if (data.success) { 
                return true
            } else {
                return false
            } 
        } catch(error) {
            console.error(error)
            return false
        }
    }

    const deleteAccount = async(email, website) => {
        try {
            const data = await makeRequest("https://pass.aniksingha.com/password_management/delete_account", "POST", {email, website})

            if (data.success) { 
                return true
            } else {
                return false
            } 
        } catch(error) {
            console.error(error)
            return false
        }
    }

    const updatePassword = async(email, website, password) => {
        try {
            const data = await makeRequest("https://pass.aniksingha.com/password_management/update_password", "PUT", {email, website, new_password: password})

            if (data.success) { 
                return true
            } else {
                return false
            } 
        } catch(error) {
            console.error(error)
            return false
        }
    }

    return (
        <UserContext.Provider value={{ user, sessionId, login, register, resetPassword, logout, getCookies, validateSession, addAccount, deleteAccount, updatePassword}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider, makeRequest }
