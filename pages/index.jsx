import Link from "next/link"
import { useState } from "react";
import useSWR from 'swr';
import fetcher from "@/components/fetcher";
import { useEffect } from "react";
import { useRouter } from 'next/router'


export default function Index() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const { data, error, isLoading } = useSWR(`/api/search/${input == '' ? '$$$' : input}`, fetcher);
    const router = useRouter();

    useEffect(() => {
        if (!error && !isLoading) setResults(data.result)
    }, [data])


    const goToMovie = imdb_id => {
        router.push('/' + imdb_id);
    }


    const getBackup = () => {
        fetch(`/api/backup`)
            .then(res => res.json())
            .then(data => {})
    }


    return (<>
        <Link href="/insert" className="btn btn-sm btn-warning font-light mt-5">
            <svg className="w-4 h-4 fill-warning-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
            <span className="ml-1 capitalize">insert movie</span>
        </Link>
        <a href="http://185.130.46.219/backup" onClick={getBackup} className="btn btn-warning font-light btn-sm mt-5 ml-2">
            <svg className="w-4 h-4 fill-warning-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
            <span className="ml-1 capitalize">download backup</span>
        </a>
        <div className="form-control my-2">
            <label className="input-group">
                <span className="w-16 place-content-center bg-sky-200">
                    <svg className="w-5 h-5 search-icon fill-sky-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
                </span>
                <input value={input} onChange={(data) => setInput(data.target.value)} type="text" placeholder="Enter Movie name..." className="input w-full capitalize h-14 px-0 text-lg" />
            </label>
        </div>


        <div className="overflow-x-auto">
            <table className="table w-full table-compact">
                <tbody>
                    {
                        results.map(value => (
                            <tr onClick={() => goToMovie(value.imdb_id)} className="cursor-pointer">
                                <th className="bg-sky-200">
                                    <div className="text-lg text-sky-900 font-light capitalize">{value.title}</div>
                                    <div className="text-xs text-sky-900 opacity-50">{value.imdb_id}</div>
                                </th>
                                <td dir="rtl" className="bg-sky-200">
                                    <div><svg className="w-4 h-4 fill-sky-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg></div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>)
}
