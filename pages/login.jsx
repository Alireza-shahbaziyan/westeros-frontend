import fetcher from "@/components/fetcher";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router'
import { useState } from "react";
import useSWR from 'swr';

export default function Login() {

    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    const [disable, setDisable] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userAuth = () => {

        if (!username && !password) {
            alert("Please enter your username & password, then click button.");
            return;
        }

        setDisable(true);
        fetch("/api/check-user", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(res => res.json())
            .then(data => {
                setDisable(false);
                if (data.status) {
                    setCookie("username", username);
                    setCookie("password", password);
                    router.push("/")
                }
                else {
                    alert("username or password is wrong!")
                    removeCookie("username");
                    removeCookie("password");
                }
            })
    }

    return (<>
        <div className="grid max-w-96 min-h-screen place-content-center gap-y-2">
            <div><input value={username} onChange={(data) => { setUsername(data.target.value) }} type="text" placeholder="Username" className="input w-full" /></div>
            <div><input value={password} onChange={(data) => { setPassword(data.target.value) }} type="password" placeholder="Password" className="input w-full" /></div>
            <div><button onClick={userAuth} className={"btn no-animation btn-lg btn-warning w-full " + (disable == true ? "btn-disabled loading" : "")}>Login</button></div>
        </div>
    </>)
}