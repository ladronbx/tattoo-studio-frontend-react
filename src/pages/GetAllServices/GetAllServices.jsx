import React, { useState, useEffect } from "react"
import "./GetAllServices.css"
import { getServices } from "../../services/apiCalls"
import { CardService } from "../../common/CardService/CardService"

export const GetAllServices = () => {

    const [services, setservices] = useState([])

    useEffect(() => {
        if (services.length === 0) {

            getServices()
                .then(services => {
                    setservices(services.data.data)
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