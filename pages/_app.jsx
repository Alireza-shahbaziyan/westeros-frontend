import NextNProgress from 'nextjs-progressbar';
import { useCookies } from "react-cookie";
import Header from '@/components/header';
import { useRouter } from 'next/router'
import { useEffect } from "react";
import '@/styles/globals.css'
import '@/styles/fonts.css'

export default function App({ Component, pageProps }) {

    if (Component.raw) return <div data-theme="synthwave" className="min-h-screen"><Component /></div>;

    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    console.log(pageProps);
    useEffect(() => {
        if (!cookies.username || !cookies.password) {
            router.push('/login');
        } else {
            fetch("/api/check-user", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: cookies.username,
                    password: cookies.password,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.status) {
                        removeCookie("username");
                        removeCookie("password");
                        router.push("/login");
                    }
                })
        }
    }, []);

    return (<>
        <NextNProgress color="#FABF3C" />
        
        <div data-theme="dark" className="grid min-h-screen psans bg-sky-900" >

            <div className="grid grid-cols-12">
                <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
                <div className="col-span-10 md:col-span-8 lg:col-span-6">
                    <Component {...pageProps} />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
            </div>
        </div>
    </>)
}
