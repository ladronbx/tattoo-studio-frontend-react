import React, { useState, useEffect } from "react"
import "./Gallery.css"
import { getServices } from "../../services/apiCalls"
import { CardService } from "../../common/CardService/CardService"

export const Gallery = () => {

    const [services, setservices] = useState([])
    const [loop, setloop] = useState(false)

    useEffect(() => {
        if (services.length === 0) {

            getServices()
                .then(services => {
                    if(loop == false){
                        setservices(services.data.data)
                        setloop(true)             
                    }

                })
                .catch(error => console.log(error))
        }
    }, [services])

    return (
        <div className="cards-services-body">
            {
             
                services.length > 0
                    ? (
                        <div>
                            {
                                services.map((service) => {
                                    return <CardService
                                    key={service.id}
                                    image={service.image}
                                    name={service.name}
                                    category={service.category}
                                    price={service.price}
                                />
                                    
                                })
                            }
                        </div>)

                    : (<div> Loading ... </div>)
            }
       
    </div>
    )
}