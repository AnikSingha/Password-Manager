import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import { makeRequest } from "./UserContext"

export default function Test() {
    const {user} = useContext(UserContext)
    
    

    return (
    <div>HI {user}</div>
    )
}
