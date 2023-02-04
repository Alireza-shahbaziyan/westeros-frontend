import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Movie() {
    Movie.raw = true;

    const router = useRouter();
    const { imdb_id, user_id } = router.query;
    // main data
    const [movie, setMovie] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [isBookmark, setIsBookmark] = useState(false);

    // utils
    const [allSeasons, setAllSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [buttons, setButtons] = useState([]);



    function SendFile(mid) {

        setButtons(buttons.filter((value) => (
            value != mid
        )));

        fetch("/api/send-file", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                mid: mid,
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(data => { })
    }


    const toggleBookmark = () => {
        setIsBookmark(!isBookmark);
        fetch("/api/toggle-bookmark", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                imdb_id: imdb_id,
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(data => { })
    }

    useEffect(() => {
        fetch("/api/movies", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                imdb_id: imdb_id,
                user_id: user_id,
            })
        })
            .then(res => res.json())
            .then(data => {
                setMovie(data.movie);
                setEpisodes(data.episodes);
                setAllSeasons(data.all_seasons);
                setSelectedSeason(data.all_seasons[0]);
                setIsBookmark(data.is_bookmark);
                setButtons(data.episodes.map((value) => (value.mid)));
            })
    }, [])


    const changeSeason = value => {
        setSelectedSeason(Number(value));
    }

    if (episodes.length == 0) return <><div className="grid min-h-screen place-content-center"><Image src="/gopher.gif" width={100} height={100} alt="Loading..." /></div></>
    return (<>
        {/* modal */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <div className='flex justify-between'>
                    <h3 className="font-bold text-lg text-center">Select the season</h3>
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </label>
                </div>
                <div className="modal-action grid grid-cols-1">
                    <div className='w-full'>
                        {
                            allSeasons.filter((value) => { if (value != selectedSeason) { return true } }).map((value, index) => (
                                <label key={index} onClick={() => changeSeason(value)} htmlFor="my-modal" className="btn btn-block my-1 capitalize">Season {value}</label>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

        {movie != {} &&
            <div className="sticky top-0 w-full text-center text-xl select-none bg-neutral text-neutral-content truncate">{movie.title}</div>
        }

        <div className="grid h-48">

            {movie != {} &&
                <div className="w-full h-36 bg-cover bg-center grid grid-cols-9 anjoman font-bold" style={{ backgroundImage: `url(${movie.cover})` }}>

                    <div className="w-32 h-44 ml-2 mt-4 rounded-lg bg-cover bg-center col-span-4" style={{ backgroundImage: `url(${movie.cover})` }}></div>

                    <div dir="rtl" className='col-span-5 flex items-end'>
                        {isBookmark
                            ?
                            <div onClick={toggleBookmark} className="btn btn-sm btn-primary btn-square mr-2">
                                {/* <svg className='w-4 h-4 fill-content-accent' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg> */}
                                {/* <svg className='w-4 h-4 fill-primary-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" /></svg> */}
                                <svg className='w-4 h-4 fill-primary-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                            </div>
                            :
                            <div onClick={toggleBookmark} className="btn btn-sm btn-neutral btn-square mr-2">
                                {/* <svg className='w-4 h-4 fill-neutral-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" /></svg> */}
                                <svg className='w-4 h-4 fill-neutral-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                            </div>
                        }
                        {selectedSeason != 0 &&
                            <label htmlFor={allSeasons.length != 1 && "my-modal"} className={"btn btn-sm mr-1 gap-x-1 capitalize " + (allSeasons.length == 1 && "tooltip flex justify-center no-animation")} data-tip={allSeasons.length == 1 && "No more"}>
                                S{selectedSeason}
                                {allSeasons.length != 1 &&
                                    // <svg className='w-4 h-4 fill-neutral-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                    <svg className='w-4 h-4 fill-neutral-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
                                }
                            </label>
                        }
                        <div className="tooltip" data-tip="Rate">
                            <div className="btn btn-sm mr-1 gap-x-1 no-animation">
                                <span>{movie.rating}</span>
                                <svg className='w-4 h-4 fill-neutral-content' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-2 mx-2 gap-2 place-content-center">
            {
                episodes.filter((value) => { if (value.season == selectedSeason) return value }).sort((a, b) => a.number - b.number).reverse().map((value, index) => {
                    if (value.episode != 0) {
                        return (
                            <button key={index} onClick={() => SendFile(value.mid)} disabled={buttons.findIndex((v) => v == value.mid) == -1} className="btn btn-sm btn-primary">
                                {value.episode} - {value.quality}p
                            </button>
                        )
                    }
                })
            }
        </div>
        <div className="grid grid-cols-3 mx-2 gap-2 place-content-center">
            {
                episodes.filter((value) => { if (value.season == selectedSeason) return value }).sort((a, b) => a.number - b.number).reverse().map((value, index) => {
                    if (value.episode == 0) {
                        return (
                            <button key={index} onClick={() => SendFile(value.mid)} disabled={buttons.findIndex((v) => v == value.mid) == -1} className="btn btn-sm btn-primary">
                                {qualityManager(value.quality)}
                            </button>
                        )
                    }
                })
            }
        </div>
    </>)
}


