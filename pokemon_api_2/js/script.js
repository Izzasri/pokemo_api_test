async function getPokemon() {
	document.querySelector('.pokemon').innerHTML = '';

	const id = document.querySelector('#search').value;
	
	document.querySelector('.success').classList.add('hidden');
	document.querySelector('.loading').classList.remove('hidden');
	
	let pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
	let pokemon = await pokemonFetch.json();
	
	const pokemonTypes = pokemon.types.map(type => {
		return `<li>${type.type.name}</li>`;
	}).join('');
	
	const pokemonCard = `<div class="pokemonCard">
		<div class="id">#${pokemon.id}</div>
		<div class="name">${pokemon.name}</div>

		<img src = ${pokemon.sprites.front_default}>
		<div class="type">Types: <ul>${pokemonTypes}</ul></div>
		<div class="type">Height: <ul>${pokemon.height}</ul></div>
		<div class="type">Weight: <ul>${pokemon.weight}</ul></div>
	</div>`;
	
	document.querySelector('.loading').classList.add('hidden');
	document.querySelector('.success').classList.remove('hidden');
	document.querySelector('.pokemon').innerHTML = pokemonCard;
}

document.querySelector('.getPokemon').addEventListener('click', getPokemon);
