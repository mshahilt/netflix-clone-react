import React, { useEffect, useState } from 'react'
import './Player.css';
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom';
import netflix_spinner from "../../assets/netflix_spinner.gif"

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  const [loading, setLoading] = useState(true); 

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODE3OWE4Y2Q0NGU5ZDRkZDNiNzhhNGNkOTkxZjEwMCIsIm5iZiI6MTczMzk5NzczMi44NzEsInN1YiI6IjY3NWFiNGE0YTdhYmNjMzhkMTM4M2FhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09GlQ-oMeMj998h0pMNOPDqWwpZuVg3K5XSeHBIJh0c'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        setApiData(res.results[0]);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='player'>
        <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-2) }} />
        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder={0} allowFullScreen></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      </div>
    )
  )
}

export default Player;
