import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"

const logoutPage = () => {
    const router = useRouter()
    const { handleUserInfo } = useContext(UserContext);
    useEffect(()=>{
            window.localStorage.removeItem('userInfo');
            document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            handleUserInfo(null);
            router.push('/');
    })

    return (<div></div>)
}

export default logoutPage