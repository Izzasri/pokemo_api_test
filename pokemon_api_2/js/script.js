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
			pokeResults.style.padding = "250px 50px";
			alert("The Pokémon ID or name you are looking for is not found!" + "\n" +"Please ensure your entered Pokémon ID is between 1 - 802."  + "\n" + "If you are using Pokémon name, ensure it is typed correctly.");
			return
		}
	})

	let pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	let pokemon = await pokemonFetch.json();
	
	const pokemonAbilities = pokemon.abilities.map(ability => {
		return `<span>${ability.ability.name}</span>`;
	}).join(', ');
	
	const pokemonTypes = pokemon.types.map(type => {
		return `<span>${type.type.name}</span>`;
	}).join(', ');

	const pokemonMoves = pokemon.moves.map(move => {
		return `<span>${move.move.name}</span>`
	}).join(', ');
	
	const pokemonCard = `<div class="pokemonCard">
		<div class="idName+img+data+stats">
			<div class="pokeIdName">#${pokemon.id} ${pokemon.name}</div>
				<img src = ${pokemon.sprites.front_default} class="pokeImg">
			<div class="data">
				<div class="type" style="text-transform: capitalize;"><b>Type: </b>${pokemonTypes}</div>
				<div class="abilities" style="text-transform: capitalize;"><b>Abilities: </b>${pokemonAbilities}</div>
				<div class="height"><b>Height: </b>${pokemon.height} cm</div>
				<div class="weight"><b>Weight: </b>${pokemon.weight} g</div>
			</div>
			<div class="stats">
				<div class="statsChild"><b>HP: </b>${pokemon.stats[0].base_stat} <b>Attack: </b>${pokemon.stats[1].base_stat}</div>
				<div class="statsChild"><b>Defense: </b>${pokemon.stats[2].base_stat} <b>Speed: </b>${pokemon.stats[5].base_stat}</div>
				<div class="statsChild"><b>Special-Attack: </b>${pokemon.stats[3].base_stat}</div>
				<div class="statsChild"><b>Special-Defense: </b>${pokemon.stats[4].base_stat}</div>
			</div>
		</div>
		
		<div class="moves">
			<div style="font-size: 30px; font-weight: bold; text-align: center;">Moves: </div>
			<div>${pokemonMoves}
			</div>
		</div>
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
