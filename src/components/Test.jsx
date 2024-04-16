import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import { makeRequest } from "./UserContext"

export default function Test() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await makeRequest('http://127.0.0.1:5000/', 'GET');
                if (data) {
                    console.log("WORKED, COOKIE EXISTS");
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    
    }, []);
    
    

    return (
    <div>HI</div>
    )
}
