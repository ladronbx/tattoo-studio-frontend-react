import React, { useState, useEffect } from "react";
import "./GetArtists.css";
import { CardArtist } from "../../common/CardArtist/CardArtist";
import { getArtists } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const GetArtists = () => {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
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
    setPage(page + 1);
  };

  const changePageDown = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="cards-artists-container-main">
      <div className="pagination-container">
        <PaginationButton
          classPagination="previous-artist"
          text={"Previous"}
          changePagination={() => changePageDown()}
        />
        <PaginationButton
          classPagination="next-artist "
          text={"Next"}
          changePagination={() => changePageUp()}
        />
      </div>

      <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 col-card-artist">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div className="col mb-3 ">
              <CardArtist
                full_name={artist.full_name}
                photo={artist.photo}
                email={artist.email}
                phone_number={artist.phone_number}
              />
            </div>
          ))
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>

  );
};
