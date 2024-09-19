import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}`)
            .then(response => response.json())
            .then(data => setCharacter(data));
    }, [id]); 

    if (!character) {
        return <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 	0, right: 0, bottom: 0 }}> 
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Cargando...</span>
					</div>
				</div>;
    }

    return (
		<>
        <div className="container">
			<div className="row d-flex justify-content-center ">
				<img className="col-6  " src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg` } alt={character.name} style={{ maxHeight: '400px', width: 'auto' }} />
				<div className="col-4 text-center ">
					<h1 >{character.name}</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			</div>
			<hr className="border border-danger border-2 opacity-50 m-4"></hr>
			<div className="row text-center">
				<p className="col-2"><strong>Name</strong> </p>
				<p className="col-2"><strong>Birth Year</strong> </p>
				<p className="col-2"><strong>Gender</strong> </p>
				<p className="col-2"><strong>Height</strong> </p>
				<p className="col-2"><strong>Skin Color</strong> </p>
				<p className="col-2"><strong>Eye Color</strong> </p>
			</div>
			<div className="row text-center">
				<p className="col-2">{character.name}</p>
				<p className="col-2">{character.birth_year}</p>
				<p className="col-2">{character.gender}</p>
				<p className="col-2">{character.height}</p>
				<p className="col-2">{character.skin_color}</p>
				<p className="col-2">{character.eye_color}</p>
			</div>
        </div>
		
		</>
    );
};