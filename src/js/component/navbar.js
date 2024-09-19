import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context); 

    const extractIdFromUrl = (url) => {
        const regex = /\/([0-9]*)\/$/;  
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getLink = (fav) => {
        const id = extractIdFromUrl(fav.url);
        if (fav.hair_color) {
            return `/single/${id}`;  
        } else if (fav.population) {
            return `/demo/${id}`;   
        }
        return "#";  
    };
    

    return (
        <nav className="navbar navbar-light bg-light mb-3 navbar-sticky">
            <Link to="/">
                <span className="navbar-brand mb-0 ml-2">
                    <img src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG36.png" alt="Logo Star Wars" />
                </span>
            </Link>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle me-4" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Favoritos ({store.favorites.length})
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    {store.favorites.length > 0 ? (
                        store.favorites.map((fav, index) => (
                            <Link to={getLink(fav)} key={index}>
                                <li className="dropdown-item d-flex justify-content-between align-items-center">
                                    {fav.name}
                                    <button 
                                        className="btn btn-danger btn-sm ms-2" 
                                        onClick={() => actions.toggleFavorite(fav)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </li>
                            </Link>
                        ))
                    ) : (
                        <li className="dropdown-item">No hay favoritos</li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
