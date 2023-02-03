import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MoviePanel() {
    const router = useRouter();
    const { imdb_id } = router.query;
    const [disable, setDisable] = useState(false);

    const [title, setTitle] = useState("Loading...")
    const [episodes, setEpisodes] = useState([]);
    const [season, setSeason] = useState("");
    const [episode, setEpisode] = useState("");
    const [quality, setQuality] = useState("");
    const [mid, setMid] = useState("");


    const getMovie = () => {
        console.log("getMovie running.")
        fetch(`/api/movie/${imdb_id}`)
            .then(res => res.json())
            .then(data => {
                setEpisodes(data['episodes']);
                setTitle(data['title']);
            })
    }

    useEffect(() => {
        getMovie();
    }, []);

    const insertEpisode = () => {
        if (season == "" && episode == "" && quality == "" && mid == "") {
            alert("Please fill all inputs!");
            return
        }

        setDisable(true);
        fetch("/api/insert-episode", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                imdb_id: imdb_id,
                season: season,
                episode: episode,
                quality: quality,
                mid: mid,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    getMovie();
                }
                else {
                    alert(data.message);
                }
                setDisable(false);
            })
    }


    const deleteEpisode = mid => {
        fetch(`/api/delete-episode/${mid}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    getMovie();
                } else {
                    alert("Error happend")
                }
            })
    }


    return (<>
        <div className="text-2xl mt-5 flex items-center text-sky-100 justify-center sm:justify-start">
            <Link href={"/"}><svg className="w-4 h-4 fill-sky-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></Link>
            <Link href={"/"} className="">{title}</Link>
        </div>

        <div className="grid grid-cols-12 gap-y-2 mt-3">
            
            <div className="col-span-12 sm:col-span-3 text-center sm:text-start">
                <div className="stats sm:stats-vertical">
                    <div className="stat bg-sky-200 text-sky-900">
                        <div className="stat-title">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                    <div className="stat bg-sky-200 text-sky-900">
                        <div className="stat-title">Likes</div>
                        <div className="stat-value">2K</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>
                </div>
            </div>

            <div className="divider sm:divider-horizontal col-span-12 sm:col-span-1"></div> 

            <div className="col-span-12 sm:col-span-8">
                <div className="overflow-x-auto">
                    <table className="table w-full table-compact">
                        <tbody>
                            <tr>
                                <td className="bg-sky-100"><input value={season} onChange={(data) => setSeason(data.target.value)} placeholder="Season..." className="input input-xs text-lg" type="text" /></td>
                            </tr>
                            <tr>
                                <td><input value={episode} onChange={(data) => setEpisode(data.target.value)} placeholder="Episode..." className="input input-xs text-lg" type="text" /></td>
                            </tr>
                            <tr>
                                <td><input value={quality} onChange={(data) => setQuality(data.target.value)} placeholder="Quality..." className="input input-xs text-lg" type="text" /></td>
                            </tr>
                            <tr>
                                <td><input value={mid} onChange={(data) => setMid(data.target.value)} placeholder="MID..." className="input input-xs text-lg" type="text" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={insertEpisode} className={"btn no-animation btn-block btn-warning mt-3 " + (disable == true ? "btn-disabled loading" : "")}>Insert</button>
            </div>
        </div>
        <div className="divider"></div>
        {episodes.length > 0 &&
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr className="text-center">
                            <th>S</th>
                            <th>E</th>
                            <th>Q</th>
                            <th>MID</th>
                            <th>DEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map(value => (
                            <tr className="hover text-center">
                                <td>{value.season}</td>
                                <td>{value.episode}</td>
                                <td>{value.quality}</td>
                                <td>{value.mid}</td>
                                <td>
                                    <svg onClick={() => deleteEpisode(value.mid)} className="w-4 h-4 fill-sky-900 mx-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
    </>)
}