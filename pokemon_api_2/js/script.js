var pokeResults = document.getElementsByClassName('pokechecker')[0];
var inputStr = document.getElementById('search').value;
var inputNum = parseInt(inputStr);

function consoleInput(){
	let inputStrConsole = document.getElementById('search').value;
	console.log("You typed in: " + inputStrConsole)
}

async function getPokemon() {
	const id = document.querySelector('#search').value;
	document.querySelector('.pokemon').innerHTML = '';
	// document.querySelector('.success').classList.add('hidden');
	// document.querySelector('.loading').classList.remove('hidden');

	fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	.then(function(Response){
		if(Response.status == 404){
			pokeResults.style.borderRadius = "50%";
			pokeResults.style.padding = "100px 50px";
			alert("The Pokémon ID or name you are looking for is not found!" + "\n" +"Please ensure your entered Pokémon ID is between 1 - 802."  + "\n" + "If you are using Pokémon name, ensure it is typed correctly.");
			return
		}
	})

	let pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	let pokemon = await pokemonFetch.json();
	
	const pokemonTypes = pokemon.types.map(type => {
		return `<span>${type.type.name}</span>`;
	}).join(', ');

	const pokemonMoves = pokemon.moves.map(move => {
		return `<span>${move.move.name}</span>`
	}).join(', ');
	
	const pokemonCard = `<div class="pokemonCard">
		<div class="idName+img">
			<div class="pokeIdName">#${pokemon.id} ${pokemon.name}</div>
			<img src = ${pokemon.sprites.front_default} class="pokeImg">
		</div>
		<div class="data">
			<div class="type"><b>Type: </b>${pokemonTypes}</div>
			<div class="height"><b>Height: </b>${pokemon.height} cm</div>
			<div class="weight"><b>Weight: </b>${pokemon.weight} g</div>
		</div>
		<div class="stats">

		</div>
		<div class="moves""><b>Moves: </b><br>${pokemonMoves}</div>
	</div>`;
	
	// document.querySelector('.loading').classList.add('hidden');
	// document.querySelector('.success').classList.remove('hidden');
	document.querySelector('.pokemon').innerHTML = pokemonCard;

	pokeResults.style.borderRadius = "20px";
	pokeResults.style.padding = "20px";
}

document.querySelector('.getPokemon').addEventListener('click', function (){
	// alert("InputNum type is " + typeof(inputNum))
	if(inputNum < 1 || inputNum > 802){
		alert("Please enter ID between 1 to 802 only.")
		document.getElementById('search').value = "";
		return;	
	}else{
		getPokemon();
	}
});
