import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then(response => response.json())
            .then(data => setPlanet(data));
    }, [id]); 

    if (!planet) {
        return <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}> 
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>;
    }

    const getImage = () => {
        return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    };

	// esta solucion la encontré aqui https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
    const imageError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";  //No hay imagen de un planeta
    };

    return (
        <>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <img 
                    className="col-6" 
                    src={getImage()} 
                    alt={planet.name} 
                    style={{ maxHeight: '400px', width: 'auto' }} 
                    onError={imageError}
                />
                <div className="col-4 text-center">
                    <h1>{planet.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <hr className="border border-danger border-2 opacity-50 m-4"></hr>
            <div className="row text-center">
                <p className="col-2"><strong>Name</strong></p>
                <p className="col-2"><strong>Climate</strong></p>
                <p className="col-2"><strong>Gravity</strong></p>
                <p className="col-2"><strong>Population</strong></p>
                <p className="col-2"><strong>Rotation Period</strong></p>
                <p className="col-2"><strong>Surface Water</strong></p>
            </div>
            <div className="row text-center">
                <p className="col-2">{planet.name}</p>
                <p className="col-2">{planet.climate}</p>
                <p className="col-2">{planet.gravity}</p>
                <p className="col-2">{planet.population}</p>
                <p className="col-2">{planet.rotation_period}</p>
                <p className="col-2">{planet.surface_water}</p>
            </div>
        </div>
        </>
    );
};
