
// då gör vi en search  funktion

// importerar html element
const searchInput = document.getElementById("findMovie");
const movieSort = document.getElementById("movieSort")
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("resultContainer");

// så att man kan söka med att bara trycka enter:

// och här handlar det om att trycka på knappar
searchInput.addEventListener("keypress", (event) => {
    // så när "Enter" trycks så händer det grejer
    if (event.key === "Enter") {
        // trim() tar bort "onödiga mellanslag"
        const query = searchInput.value.trim();

        // här söker vi på texten för att se om vi hittar en film
        if (query) {
            searchMovie(query);
        } else {
            // lämnas sökfältet tomt, får vi detta svar:
            resultContainer.innerHTML = "<p>Please enter the title of the movie you're looking for in the field above </p>";
        }

    }
});

// och genom att trycka på knappen:
searchButton.addEventListener("click", () => {

    // typ samma sak som uppe, fast med knappen ist för enter
    const query = searchInput.value.trim();

    if (query) {
        searchMovie(query);
    } else {

        resultContainer.innerHTML = "<p>Please enter the title of the movie you're looking for in the field above </p>";
    }
    // tyvärr finns just nu inte stänga funktion på knappen
    // men lägger ev till den sen
});


// funktionen för att sortera de filmer vi söker på 

// börjar med att göra resultaten 
// till en Array så att de är lättare att sortera
let currentMovies = [];

// gartdinmenyn ska få en eventlistener
const sortSelect = document.getElementById("movieSort");

sortSelect.addEventListener("change", () => {
    const selectedSort = sortSelect.value;
    sortMovies(selectedSort);
});


// denna gör det möjligt att söka på filmerna öht
function searchMovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    // anropar min URL och översätter den till json
    // så att den går att jobba med
    // och så att den kan visa lista i data.result/displayMovieResult
    fetch(url)
        .then(res => res.json())
        .then(data => {
            currentMovies = data.results;       // för att sortera
            displayMovieResult(data.results);
        })
        // felmeddelande
        .catch(err => {
            console.error("Something went wrong with the search. Check your network connection ", err);
            resultContainer.innerHTML = `<p>There is an unforseen issue, please come back later. </p>`;
        });

}

// funktion för att visa sökresultaten
function displayMovieResult(movies) {
    // om det inte finns något som matchar sökningen
    if (movies.length === 0) {
        resultContainer.innerHTML = `<p>I couldn't find any movies matching that title. Please check your spelling or try another title!</p>`;

        return;
    }

    resultContainer.innerHTML = "";

    movies.forEach(movie => {
        // för varje film,
        // så skapas ett "kort"
        const movieCard = document.createElement("div");
        movieCard.classList.add("searchMovieCard");

        // där vi ser infon nedan som vi hämtar från tmdb
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <img class="posterSearch" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p><strong>Release Date:</strong> ${movie.release_date || "Unknown"}</p>
            <p><strong>Description:</strong> ${movie.overview || "No description available."}</p>
            <p><strong>Score:</strong> ${movie.vote_average}</p>
        `;

        resultContainer.appendChild(movieCard);

    });

}

// och beroende på vilket val du gör, 
// så ska olika saker hända
function sortMovies(criteria) {
    let sorted = [...currentMovies];

    if (criteria === "A-Z") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "Z-A") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (criteria === "risingRate") {
        sorted.sort((a, b) => b.vote_average - a.vote_average);
    } else if (criteria === "fallingRate") {
        sorted.sort((a, b) => a.vote_average - b.vote_average);
    }

    displayMovieResult(sorted);
}


