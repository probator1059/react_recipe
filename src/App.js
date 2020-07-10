import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
    const APP_ID = '5618558e';
    const APP_KEY = '022aa52b097c4d4de66ea2893aa337b9';

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(exampleReq);
        const data = await response.json();
        setRecipes(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log('changed ', search);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    return (
        <div className="App">
            <form className="search-form" onSubmit={getSearch}>
                <input
                    type="text"
                    className="search-bar"
                    value={search}
                    onChange={updateSearch}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
