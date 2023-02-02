import Link from "next/link"

export default function Header() {

    return (<>
        <div className="h-14 flex justify-center items-center bg-[#202932]">
            <div className="flex container justify-between">
                <Link href="/"><div className="mx-1 text-3xl">logo</div></Link>
                <Link href="/insert" className="btn btn-sm mx-1 btn-primary">
                    <svg className="w-4 h-4 fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    <span className="ml-1 text-slate-100">insert</span>
                </Link>
            </div>
        </div>
    </>)
}