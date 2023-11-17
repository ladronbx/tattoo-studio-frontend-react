import React, { useState, useEffect } from "react"
import "./GetArtists.css"
import { CardArtist } from "../../common/CardArtist/CardArtist"
import { getArtists } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const GetArtists = () => {

    const [artists, setArtists] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate();

    useEffect(() => {
        if (artists || artists.length === 0) {
            const pageString = page.toString();
            getArtists(pageString)
                .then((response) => {
                    if (Array.isArray(response.data.data)) {
                        setTimeout(() => {
                            setArtists(response.data.data);
                        }, 200);
                    } else {
                        setPage(page - 1);
                    }
                })
                .catch((error) => console.log(error));
        } else {
            navigate("/");
        }
    }, [page]);

    const changePageUp = () => {
        setPage(page + 1)
    }

    const changePageDown = () => {
        if (page != 0) {
            setPage(page - 1)
        }
    }

    return (
        <div className="cards-artists-body">

            <PaginationButton
                classPagination={"next"}
                text={"Next"}
                changePagination={() => changePageUp()}
            />
            <PaginationButton
                classPagination={"previus"}
                text={"Previus"}
                changePagination={() => changePageDown()}
            />
            {
                artists.length > 0

                    ? (
                        <div>
                            {
                                artists.map((artist) => {
                                    return <CardArtist
                                        key={artist.id}
                                        full_name={artist.full_name}
                                        photo={artist.photo}
                                        email={artist.email}
                                        phone_number={artist.phone_number}
                                    />
                                })
                            }
                        </div>)

                    : (<div> Loading ... </div>)
            }
        </div>
    )
}