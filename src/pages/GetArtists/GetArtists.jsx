import React, { useState, useEffect } from "react"
import "./GetArtists.css"
import { CardUser } from "../../common/CardUSer/CardUser"
import { getArtists } from "../../services/apiCalls"

export const GetArtists = () => {

    const [artists, setArtists] = useState([])


    useEffect(() => {
        if (artists.length === 0) {

            getArtists()
                .then(artists => {
                    console.log(artists)
                    setArtists(artists.data.data)
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
                                    return <CardUser
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