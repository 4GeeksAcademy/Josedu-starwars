const getState = ({ getStore, getActions, setStore }) => {
	return {
			store: {
				people: [], 
				planets: [], 
				favorites: [] 
			},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			peopleData: () => {
				fetch(`https://swapi.dev/api/people`)
					.then(response => response.json())
					.then(data => {
						setStore({ people: data.results }); 
					})
			},
			
			planetsData: () => {
				fetch(`https://swapi.dev/api/planets`)
				.then(response => response.json())
				.then(data => {
					setStore({ planet: data.results }); 
					})
				},

			toggleFavorite: (item) => {
				const store = getStore();
				const favorites = store.favorites;
	
				const isFavorite = favorites.find(fav => fav.name === item.name);
				if (isFavorite) {
					const newFavorites = favorites.filter(fav => fav.name !== item.name);
					setStore({ favorites: newFavorites });
				} else {
					
				setStore({ favorites: [...favorites, item] });
				}
			},
		}
	}
};

export default getState;
