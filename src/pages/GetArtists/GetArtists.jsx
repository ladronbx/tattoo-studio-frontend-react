import React, { useState, useEffect } from "react"
import "./GetArtists.css"
import { CardArtist } from "../../common/CardArtist/CardArtist"
import { getArtists } from "../../services/apiCalls"

export const GetArtists = () => {

    const [artists, setArtists] = useState([])
    const [loop, setloop] = useState(false)

    useEffect(() => {
        if (artists.length === 0) {

            getArtists()
                .then(artists => {
                    if(loop == false){
                        setArtists(artists.data.data)
                        setloop(true)
                    }
                })
                .catch(error => console.log(error))
        }
    }, [artists])

    return (
        <div className="cards-artists-body">
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