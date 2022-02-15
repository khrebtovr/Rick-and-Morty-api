function foTo404(){
    location.href = '/404.html';
}


async function getCharacter(){
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if(!id){
        foTo404()
    }
    const url =`https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.error){
        foTo404();
    }
    return data;
}

async function renderCharacter(){
    const character = await getCharacter();
    const {name,species,image,episode} = character;

    const nameElement = document.querySelector('.name');
    nameElement.textContent = name;

    const spieceElement = document.querySelector('.species');
    spieceElement.textContent = species;

    const imageElement = document.querySelector('.image');
    imageElement.src = image;

    const episodesElement = document.querySelector('.episodes');
    const episodesText = episode.slice(0,10).join(', ');
    episodesElement.textContent = episodesText;
}
renderCharacter()

getCharacter()


// async function getAllApi() {
//     const response = await fetch('https://rickandmortyapi.com/api');
//     const data = await response.json();
//     return data;
// }
// getAllApi()

// async function getCharacterAll() {
//     const response = await getAllApi();
//     const data = await fetch(response.characters);
//     const characters = await data.json();
//     console.log(characters);
//     return characters;
// }
// getCharacterAll()

// async function getLocations() {
//     const response = await getAllApi();
//     const data = await fetch(response.locations);
//     const locations = await data.json();
//     console.log(locations);
//     return locations;
// }
// getLocations()

// async function getEpisodes() {
//     const response = await getAllApi();
//     const data = await fetch(response.episodes);
//     const episodes = await data.json();
//     console.log(episodes);
//     return episodes;
// }
// getEpisodes()