import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { USER_COOKIE } from "../constant"
import { UserContext } from "../context/userContext"

const logoutPage = () => {
    const router = useRouter()
    const { handleUserInfo } = useContext(UserContext);
    useEffect(()=>{
            window.localStorage.clear();
            document.cookie = USER_COOKIE + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            handleUserInfo(null);
            router.push('/');
    })

    return (<div></div>)
}

export default logoutPage