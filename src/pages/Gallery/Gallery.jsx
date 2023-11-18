import React, { useState, useEffect } from "react"
import "./Gallery.css"
import { getServices } from "../../services/apiCalls"
import { CardService } from "../../common/CardService/CardService"
import { PaginationButton } from "../../common/PaginationButton/PaginationButton"
import { useNavigate } from "react-router-dom"

export const Gallery = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (services || services.length == 0) {
            const pageString = page.toString();
            getServices(pageString)
                .then((response) => {
                    if (Array.isArray(response.data.data)) {
                        setTimeout(() => {
                            setServices(response.data.data);
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
        <div className="cards-artists-container-main container">
        <div className="row row-pagination pagination-container">
          <div className="pagination">
            <PaginationButton
              classPagination={"previous"}
              text={"Previous"}
              changePagination={() => changePageDown()}
            />
            <PaginationButton
              classPagination={"next"}
              text={"Next"}
              changePagination={() => changePageUp()}
            />
          </div>
        </div>
  
            {

                services.length > 0
                    ? (
                        <div className="row row-cols-xl-4 row-cols-md-2 row-cols-sm-1 row-card-artist">
                            { 
                                services.map((service) => {
                                    return <CardService
                                        key={service.id} className="col mb-4 col-card-artist"
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