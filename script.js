const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=de92bb5164ad39410973ec6c0cc92117&page=1";
const IMAGE = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=de92bb5164ad39410973ec6c0cc92117&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search')

// llamo la api en pantalla
getMovies(APIURL);
// llamo la api del servidor
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    verMovies(respData.results);
    console.log(respData);
}

// todo lo que va en pantalla
function verMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        //destructuring de la api que voy a usar
        const { poster_path, title, original_title, overview, vote_average} = movie;
        //elemento a estampar en pantalla, card
        const movieEl = document.createElement("div");

        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <div class="card movie">
            <div class="card-image">
                <figure class="image">
                    <img src="${IMAGE + poster_path}" alt="${original_title}">
                </figure>
            </div>
            <div class="card-content">
                <div class="media-content">
                    <p class="card-title">${title}</p>
                    <p class="card-text">${overview}</p>
                    <span class="tag is-medium">${vote_average}</span>
                </div>
            </div>
        </div>
        `;

        main.appendChild(movieEl);
    });
}

//formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //donde se van a estampar los datos
    const caricaDati = search.value;
    //como se van a cargar los datos
    if (caricaDati) {
        getMovies(SEARCHAPI + caricaDati);

        search.value= "";
    }
});

