/*Piergaetano Di Vita O46001380*/





const email = 'piergaetano97.97@gmail.com';
const password = '123ciao45'; 


let token;

function onTokenResponse(response)
{
    return response.json();
}

function onTokenJson(json)
{
    console.log(json);
    token = json.access_token;
}

fetch('https://kitsu.io/api/oauth/token',
{
    method: 'post',
    body: 'grant_type=password&username=' + email +'&password=' + password,
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
}).then(onTokenResponse).then(onTokenJson);

function onResponse(response)
{
    return response.json();
}

function onJsonAnime(json)
{
    console.log('JSON ricevuto');
    console.log(json);
    const film = document.querySelector('#anime');
    film.innerHTML = '';
    const anime = json.data[0].attributes;
    const title = document.createElement('h2');
    const original_title = document.createElement('h1');
    const img = document.createElement('img');
    const descrizione = document.createElement('p');
    title.textContent = anime.titles.en;
    original_title.textContent = anime.titles.en_jp;
    img.src = anime.coverImage.original;
    descrizione.textContent = anime.description;
    film.appendChild(title);
    film.appendChild(original_title);
    film.appendChild(img);
    film.appendChild(descrizione);
}

const API_KEY = 'k_64j467tl';

function onJsonFilm(json)
{
    console.log(json);
    const film = document.querySelector('#film');
    film.innerHTML = '';
    const film_json = json.results[0];
    const title = document.createElement('h2');
    const anno = document.createElement('h1');
    const img = document.createElement('img');
    title.textContent = film_json.title;
    anno.textContent = film_json.description;
    img.src = film_json.image;
    film.appendChild(title);
    film.appendChild(anno);
    film.appendChild(img);
    const url = 'https://imdb-api.com/en/API/MetacriticReviews/' + API_KEY + '/' + film_json.id;
    fetch(url).then(onResponse).then(onJsonDescrizioneFilm);
}


function onJsonDescrizioneFilm(json)
{
    console.log(json);
    const film = document.querySelector('#film');
    const film_json = json.items[0];
    const autore = document.createElement('h1');
    const descrizione = document.createElement('p');
    autore.textContent = film_json.autore;
    descrizione.textContent = '"' + film_json.content + '"';
    film.appendChild(autore);
    film.appendChild(descrizione);
}

function ricercaFilm(event)
{
    event.preventDefault();
    const film_input = film_form.querySelector('#film_text');
    const film_value = encodeURIComponent(film_input.value);
    console.log('Cerco: ' + film_value);
    const url = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY + '/' + film_value;
    console.log('URL: ' + url);
    fetch(url).then(onResponse).then(onJsonFilm);
}

function ricercaAnime(event)
{
    event.preventDefault();
    const anime_input = anime_form.querySelector('#anime_text');
    const anime_value = encodeURIComponent(anime_input.value);
    console.log('Cerco: ' + anime_value);
    const url = 'https://kitsu.io/api/edge/anime?filter[text]' + anime_value;
    console.log('URL: '+ url);
    fetch(url,
    {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': token.token_type + '' + token.access_token,
            'Content-Type': 'application/x-wwwform-urlencoded'
        }
    }).then(onResponse).then(onJsonAnime);
}

const film_form = document.querySelector('#film_form');
const anime_form = document.querySelector('#anime_form');

film_form.addEventListener('submit', ricercaFilm);
anime_form.addEventListener('submit', ricercaAnime);

function onfilmClick(event)
{
    console.log('Stai scegliendo un film');
    ripulisci();
    const film_form = document.querySelector('#film_form');
    
    
    const footer = document.querySelector('#risolto');
    footer.classList.add('nascondi');
    

    film_form.classList.remove('nascondi');
    film_reset.classList.remove('nascondi');
}


function onAnimeClick(event)
{
    console.log('Stai scegliendo un anime');
    ripulisci();
    const anime_form = document.querySelector('#anime_form');
   
   
    const footer = document.querySelector('#risolto');
    footer.classList.add('nascondi');
   

    anime_form.classList.remove('nascondi');
    anime_reset.classList.remove('nascondi');
}




function ripulisci()
{
    
    const film = document.querySelector('#contenitore_film');
    const anime = document.querySelector('#contenitore_anime');
   
    const film_form = document.querySelector('#film_form');
    const anime_form = document.querySelector('#contenitore_anime');
    const domanda = document.querySelector('#domanda');
    
    film.classList.add('nascondi');
    anime.classList.add('nascondi')
    
    domanda.classList.add('nascondi');
    film_form.classList.add('nascondi');
    anime_form.classList.add('nascondi');
}



function onAnimeResetClick(event)
{
    const film = document.querySelector('#anime');
    film.innerHTML = '';
    anime_reset.classList.add('nascondi');
    anime_form.classList.add('nascondi');
    onfilmClick();
}


function onfilmResetClick(event)
{
    const film = document.querySelector('#film');
    film.innerHTML = '';
    film_reset.classList.add('nascondi');
    onAnimeClick();
}



const contenitore_film = document.querySelector('#contenitore_film div');
const anime_reset = document.querySelector('#anime_reset');
const anime_box = document.querySelector('#contenitore_anime div');
const film_reset = document.querySelector('#film_reset');


contenitore_film.addEventListener('click', onfilmClick);
anime_box.addEventListener('click', onAnimeClick);
anime_reset.addEventListener('click', onAnimeResetClick);
film_reset.addEventListener('click', onfilmResetClick);
