import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { getServices } from "../../services/apiCalls";
import { CardService } from "../../common/CardService/CardService";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";
import { useNavigate } from "react-router-dom";

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
        <div className="cards-services-container-main">
            <div className="pagination-container">
                <PaginationButton
                    classPagination="previous-artist"
                    text={"<< PREVIOUS"}
                    changePagination={() => changePageDown()}
                />
                <PaginationButton
                    classPagination="next-artist"
                    text={"NEXT >>"}
                    changePagination={() => changePageUp()}
                />
            </div>
            <div className="row row-cols-xl-3 row-cols-md-3 row-cols-sm-1 col-card-services">
                {
                    services.length > 0
                        ? (
                            services.map((service) => (
                                <div className="col mb-4 card-service-gallery">
                                    <CardService
                                        image={service.image}
                                        name={service.name}
                                        category={service.category}
                                        price={service.price}
                                    />
                                </div>
                            ))
                        )

                        : (
                            <div>Loading ...</div>
                        )
                }
            </div>
        </div>
    );
};
