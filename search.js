
// då gör vi en search  funktion

const searchInput = document.getElementById("findMovie");
const searchResult = document.getElementById("result");

// och här handlar det om att trycka på knappar
searchInput.addEventListener("keypress", (event) => {
    // så när "Enter" trycks så händer det grejer
    if (event.key === "Enter") {
        // trim() tar bort "onödiga mellanslag"
        // const query = searchInput.value.trim();
        const query = searchInput.value;
        // om du inte skrev något så händer inget
        if (query) {
            searchMovie(query);
        }
    }
});

// funktion för att söka på en film
function searchMovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayMovieResult(data.results);
    })
    .catch(err => {
        console.error("Something went wrong with your search. Try again later... ", err);
        searchResult.innerHTML = `<p>Something wrong, come back later </p>`;
    });

}


// funktion för att visa sökresultaten
function displayMovieResult(movies) {
    // om det inte finns något som matchar sökningen
    if (movies.length === 0) {
        searchResult.innerHTML = `<p>I couldn't find any movies matching that title, try another one!</p>`;

        return;

    }

    searchResult.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("searchMovieCard");

        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p><strong>Release Date:</strong> ${movie.release_date || "Unknown"}</p>
            <p><strong>Description:</strong> ${movie.overview || "Ingen beskrivning tillgänglig."}</p>
            <p><strong>Score:</strong> ${movie.vote_average}</p>
        `;

        searchResult.appendChild(movieCard);

    });


}






