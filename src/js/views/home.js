import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';  // Importar iconos de corazón

export const Home = () => {
    const { store, actions } = useContext(Context);

    const getId = (url) => {
        const regex = /\/([0-9]*)\/$/;  
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    
    useEffect(() => {
        actions.peopleData();
    }, []);
    useEffect(() => {
        actions.planetsData();
    }, []);

    
    const handleFavorite = (item) => {
        actions.toggleFavorite(item);
    };

    // solucion encontrada en https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
    const imageError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";  
    };
   
    return (
        <>
        <div className="container">
            <h1 className="m-5">Characters</h1>
            <div className="row flex-row flex-nowrap" style={{overflowX: "auto"}}>
                {store.people && store.people.map((character, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} alt={character.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">
                                    <strong>Hair Color:</strong> {character.hair_color} <br />
                                    <strong>Eye Color:</strong> {character.eye_color}
                                </p>
                                <Link to={`/single/${getId(character.url)}`}>
                                    <button className="btn btn-primary">Learn More</button>
                                </Link>
                                <button
                                    className="btn btn-favorite"
                                    onClick={() => handleFavorite(character)}
                                >
                                    {store.favorites.includes(character) ? (
                                        <FaHeart className="favorite-icon active" /> 
                                    ) : (
                                        <FaRegHeart className="favorite-icon" />  
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

         {/* Plannets */}
        <div className="container">
            <h1 className="m-5">Planets</h1>
            <div className="row flex-row flex-nowrap" style={{overflowX: "auto"}}>
                {store.planet && store.planet.map((planet, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} alt={planet.name} className="card-img-top" onError={imageError} style={{ width: '300px', height: '300px' }}/>
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <p className="card-text">
                                    <strong>Population:</strong> {planet.population} <br />
                                    <strong>Terrain:</strong> {planet.terrain}
                                </p>
                                <Link to={`/demo/${getId(planet.url)}`}>
                                    <button className="btn btn-primary">Learn More</button>
                                </Link>
                                <button
                                    className="btn btn-favorite"
                                    onClick={() => handleFavorite(planet)}
                                >
                                    {store.favorites.includes(planet) ? (
                                        <FaHeart className="favorite-icon active" />
                                    ) : (
                                        <FaRegHeart className="favorite-icon" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
