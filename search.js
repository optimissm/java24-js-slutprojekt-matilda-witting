
// // då gör vi en search  funktion

// // importerar html element
// const searchInput = document.getElementById("findMovie");
// const movieSort = document.getElementById("movieSort")
// const searchButton = document.getElementById("searchButton");
// const resultContainer = document.getElementById("resultContainer");

// // så att man kan söka med att bara trycka enter:

// // och här handlar det om att trycka på knappar
// searchInput.addEventListener("keypress", (event) => {
//     // så när "Enter" trycks så händer det grejer
//     if (event.key === "Enter") {
//         // trim() tar bort "onödiga mellanslag"
//         const query = searchInput.value.trim();

//         // här söker vi på texten för att se om vi hittar en film
//         if (query) {
//             searchMovie(query);
//         } else {
//             // lämnas sökfältet tomt, får vi detta svar:
//             resultContainer.innerHTML = "<p>Please enter the title of the movie you're looking for in the field above </p>";
//         }

//     }
// });

// // och genom att trycka på knappen:
// searchButton.addEventListener("click", () => {
//     // typ samma sak som uppe, fast med knappen ist för enter
//     const query = searchInput.value.trim();

//     if (query) {
//         searchMovie(query);
//     } else {

//         resultContainer.innerHTML = "<p>Please enter the title of the movie you're looking for in the field above </p>";
//     }
// });

// // funktionen för att sortera de filmer vi söker på 

// // börjar med att göra resultaten 
// // till en Array så att de är lättare att sortera
// let currentMovies = [];

// // gartdinmenyn ska få en eventlistener
// const sortSelect = document.getElementById("movieSort");

// // ändrar ordning beroende på vad jag har i min gardin
// sortSelect.addEventListener("change", () => {
//     const selectedSort = sortSelect.value;
//     sortMovies(selectedSort);
// });


// // denna gör det möjligt att söka på filmerna öht
// function searchMovie(query) {
//     const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

//     // anropar min URL och översätter den till json
//     // så att den går att jobba med
//     // och så att den kan visa lista i data.result/displayMovieResult
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             currentMovies = data.results;       // för att sortera
//             displayMovieResult(data.results);
//         })
//         // felmeddelande
//         .catch(err => {
//             console.error("Something went wrong with the search. Check your network connection ", err);
//             resultContainer.innerHTML = `<p>There is an unforseen issue, please come back later. </p>`;
//         });

// }

// // funktion för att visa sökresultaten
// function displayMovieResult(movies) {
//     // om det inte finns något som matchar sökningen
//     if (movies.length === 0) {
//         resultContainer.innerHTML = `<p>I couldn't find any movies matching that title. Please check your spelling or try another title!</p>`;

//         return;
//     }

//     resultContainer.innerHTML = "";

//     movies.forEach(movie => {
//         // för varje film,
//         // så skapas ett "kort"
//         const movieCard = document.createElement("div");
//         movieCard.classList.add("searchMovieCard");

//         // där vi ser infon nedan som vi hämtar från tmdb
//         movieCard.innerHTML = `
//             <h3>${movie.title}</h3>
//             <img class="posterSearch" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//             <p><strong>Release Date:</strong> ${movie.release_date || "Unknown"}</p>
//             <p><strong>Description:</strong> ${movie.overview || "No description available."}</p>
//             <p><strong>Score:</strong> ${movie.vote_average}</p>
//         `;

//         resultContainer.appendChild(movieCard);

//     });

// }

// // och beroende på vilket val du gör, 
// // så ska olika saker hända
// function sortMovies(selection) {
//     let sorted = [...currentMovies];

//     if (selection === "A-Z") {
//         sorted.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (selection === "Z-A") {
//         sorted.sort((a, b) => b.title.localeCompare(a.title));
//     } else if (selection === "risingRate") {
//         sorted.sort((a, b) => b.vote_average - a.vote_average);
//     } else if (selection === "fallingRate") {
//         sorted.sort((a, b) => a.vote_average - b.vote_average);
//     }

//     displayMovieResult(sorted);
// }

// importerar html element

const searchInput = document.getElementById("findAnswer");
const sorting = document.getElementById("sorting")
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");


searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();

        if (query) {
            searchAll(query);
        } else {
            // om fältet lämnas tomt
            resultContainer.innerHTML = "<p>Please enter the title of the movie, or the name of the person you're looking for</p>";
        }
    }
});

personBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query) {
        searchPerson(query);
    } else {
        resultContainer.innerHTML = "<p>Please enter the title of the movie, or the name of the person you're looking for</p>";
    }
});

movieBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query) {
        searchMovie(query);
    } else {
        resultContainer.innerHTML = "<p>Please enter the title of the movie, or the name of the person you're looking for</p>";
    }
});



function searchPerson(query) {
    const personUrl = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(personUrl)
        .then(res => res.json())
        .then(data => {
            currentPerson = data.results;
            displayPersonResult(data.results);
        })
    .catch(err => {
        console.error("There is an issue with the person URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred when tying to find this person. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });
}

function searchMovie(query) {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(movieUrl)
        .then(res => res.json())
        .then(data => {
            currentMovie = data.results;
            displayMovieResult(data.results);
        })
    .catch(err => {
        // felmeddelande som visas i konsol
        console.error("There is an issue with the movie URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });

}

// för att söka på film/person öht via entertryck
// så får du ev ut både och... 
function searchAll(query) {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
    const personUrl = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(movieUrl)
        .then(res => res.json())
        .then(data => {
            currentMovie = data.results;
            displayMovieResult(data.results);
        })
    .catch(err => {
        // felmeddelande som visas i konsol
        console.error("There is an issue with the movie URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });

    // resultContainer.innerHTML = "";

    fetch(personUrl)
        .then(res => res.json())
        .then(data => {
            currentPerson = data.results;
            displayPersonResult(data.results);
        })
    .catch(err => {
        console.error("There is an issue with the person URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred when tying to find this person. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });
}

// så att filmerna visas
function displayMovieResult(movies) {
    if (movies.length === 0) {
        resultContainer.innerHTML = `<p>I couldn't find any movies with a matching title. Please check your spelling, or try another title.</p>`;

        return;
    }

    resultContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("searchMovieCard");

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

// visa personer
function displayPersonResult(persons) {
    if (persons.length === 0) {
        resultContainer.innerHTML = `<p>I couln't find anyone with that name. Please check the spelling, or try another name.</p>`;
    }

        resultContainer.innerHTML = "";

    persons.forEach(person => {
        const personCard = document.createElement("div");
        personCard.classList.add("searchPersonCard");

        const knownForList = person.known_for.map(item => {
            // Filmer har "title", TV-serier har "name"
            const title = item.title || item.name || "No title";
            return `<li>${title}</li>`;
        }).join("");

        personCard.innerHTML = `
            <h3>${person.name}</h3>
            <img class="posterSearch" src="https://image.tmdb.org/t/p/w500${person.profile_path}" alt="${person.name}">
            <p><strong>Most famous for:</strong> ${person.known_for_department}</p>
            <p><strong>Known For:</strong></p> 
                <ul>
                    ${knownForList}
                </ul>
            <p><strong>Popularity:</strong> ${person.popularity}</p>
        `;

        resultContainer.appendChild(personCard);

    });
}



