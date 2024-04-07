import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"

export default function Test() {
    const {state, login} = useContext(UserContext)
    const {isLoggedIn, username} = state

    useEffect(() => {
        const fetchData = async () => {
            await login("test@gmail.com", "test")
            if (isLoggedIn) {
                console.log(username)
            }
        };
    
        fetchData();
    }, []);
    

    return (
    <div>HI {username}!</div>
    )
}
