import React, { useState } from 'react';

function RecipeUI() {
	let name = '';
	let ingredients = '';
	let steps = '';

	let recipeOut = {
		recipeID: '',
		recipeName: '',
		recipeIngredients: '',
		recipeSteps: '',
		recipeDate: ''
	};
	let search = '';
	let getID = '';

	const [message, setMessage] = useState('');
	const [searchResults, setResults] = useState('');
	const [recipeList, setRecipeList] = useState('');
	const [getResults, setGetResults] = useState('');
	const [recipeGet, setRecipeGet] = useState('');

	const addRecipe = async event => {
		event.preventDefault();

		let js = '{"recipeName":"' + name.value + '","recipeIngredients":"' + ingredients.value
					+ '","recipeSteps":"' + steps.value + '"}';

		try {
			const response = await fetch('./api/recipes/addRecipe',
				{ method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

			let txt = await response.text();
			let res = JSON.parse(txt);

			if (res.error.length > 0)
				setMessage('API Error:' + res.error);

			else
				setMessage(recipeOut.recipeID);
		}
		catch (e) {
			setMessage(e.toString());
		}
	};

	const searchRecipe = async event => {
		event.preventDefault();

		let js = '{"search":"' + search.value + '"}';

		try {
			const response = await fetch('./api/recipes/searchByName',
				{ method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

			let txt = await response.text();
			let res = JSON.parse(txt);
			let _results = res.results;
			let resultText = '';

			for (let i = 0; i < _results.length; i++) {
				resultText += _results[i];
				if (i < _results.length - 1)
					resultText += ', ';
			}
			setResults('Recipe(s) have been retrieved');
			setRecipeList(resultText);
		}
		catch (e) {
			alert(e.toString());
			setResults(e.toString());
		}
	};

	const getRecipe = async event => {
		event.preventDefault();

		// let js = '{"userId":"' + userId + '","recipeID":"' + getID.value + '"}';

		let js = '{"recipeID":"' + getID.value + '"}';

		try {
			const response = await fetch('./api/recipes/getRecipe',
				{ method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

			let txt = await response.text();

			setRecipeGet(txt);
		}
		catch (e) {
			alert(e.toString());
			setGetResults(e.toString());
		}
	};

	return (
		<div id = "cardUIDiv">
			<br />
			<input type = "text" id = "searchName" placeholder = "Name To Search For"
				ref = { (c) => search = c } />
			<button type = "button" id = "searchNameButton" className = "buttons"
				onClick = { searchRecipe }> Search Recipe
			</button>
			<br />
			<span id = "recipeSearchResults">{ searchResults }</span>
			<p id = "recipeList">{ recipeList }</p><br /><br />
			<input type = "text" id = "searchID" placeholder = "ID To Get"
				   ref = { (c) => getID = c } />
			<button type = "button" id = "searchNameButton" className = "buttons"
				onClick = { getRecipe }> Get Recipe
			</button>
			<br />
			<span id = "recipeGetResults">{ getResults }</span>
			<p id = "recipeList">{ recipeGet }</p><br /><br />
			<input type = "text" id = "recipeName" placeholder = "Name"
				ref = { (c) => name = c } />
			<input type = "text" id = "recipeIngredients" placeholder = "Ingredients"
				   ref = { (c) => ingredients = c } />
			<input type = "text" id = "recipeSteps" placeholder = "Steps"
				   ref = { (c) => steps = c } />
			<button type = "button" id = "addRecipeButton" className = "buttons"
				onClick = { addRecipe }> Add Recipe
			</button>
			<br />
			<span id = "recipeAddResult">{ message }</span>
		</div>
	);
}

export default RecipeUI;