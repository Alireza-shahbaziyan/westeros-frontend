import { useCookies } from "react-cookie"

export default function Rm() {

    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    removeCookie("username");
    removeCookie("password");
    return (<>
        Removed
    </>)
}