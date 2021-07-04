const pokemonid = document.getElementById('pokemon');

const fetchPokemon = async () => {
   const url = `https://pokeapi.co/api/v2/pokemon?limit=100`;
   const res = await fetch(url);
   const data = await res.json();
   //console.log(data);
   const pokemon = data.results.map( (results, index) => ({
    ...results,
    name: results.name,
    id: index +1,
    image: `https://pokeres.bastionbot.org/images/pokemon/${index +1}.png`
   }));
   displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    //console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="viewPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}" alt="${pokeman.name}">
            <h2 class="card-title">${pokeman.name}</h2>
        </li>
    `
        )
        .join('');
    pokemonid.innerHTML = pokemonHTMLString;
};

const viewPokemon = async (id)  => {
    //console.log(id);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopup(pokeman);
}

const displayPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    //const image = pokeman.sprites['front_default'];
    const image = `https://pokeres.bastionbot.org/images/pokemon/${pokeman.id}.png`
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card-view">
                <img class="card-image" src="${image}" />
                <p class="types"><span>#00${pokeman.id}</span></p>
                <h2 class="card-title">${pokeman.name}</h2>
                <p>${type}</p>
            </div>
        </div>
    `;
    pokemonid.innerHTML = htmlString + pokemonid.innerHTML;
}
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon();