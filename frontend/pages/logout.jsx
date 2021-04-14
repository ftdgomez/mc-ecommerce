import { useRouter } from "next/router"
import { useEffect } from "react"

const logoutPage = () => {
    const router = useRouter()
    useEffect(()=>{
            window.localStorage.removeItem('userInfo');
            router.push('/');
    })

    return (<div></div>)
}

export default logoutPage