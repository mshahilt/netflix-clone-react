import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
  const[apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODE3OWE4Y2Q0NGU5ZDRkZDNiNzhhNGNkOTkxZjEwMCIsIm5iZiI6MTczMzk5NzczMi44NzEsInN1YiI6IjY3NWFiNGE0YTdhYmNjMzhkMTM4M2FhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09GlQ-oMeMj998h0pMNOPDqWwpZuVg3K5XSeHBIJh0c'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  })

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => currentRef.removeEventListener('wheel', handleWheel);
  }, []);

  return (
  <div className="title-cards">
    <h1>{title ? title : "Now playing"}</h1>
    <div className="card-list" ref={cardsRef}>
      {apiData.map((card) => (
        <Link to={`/player/${card.id}`} className="card" key={card.id}>
          <img
            src={card.backdrop_path 
              ? `https://image.tmdb.org/t/p/w500/${card.backdrop_path}` 
              : "https://via.placeholder.com/500x281?text=No+Image"}
            alt={card.original_title || "Movie Poster"}
          />
          <p>{card.original_title}</p>
        </Link>
      ))}
    </div>
  </div>
);

};

export default TitleCards;
