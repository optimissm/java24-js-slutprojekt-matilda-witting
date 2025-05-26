

const searchInput = document.getElementById("findAnswer");
const movieSort = document.getElementById("movieSort");
const movieBtn = document.getElementById("movieBtn");
const personBtn = document.getElementById("personBtn");
const resultContainer = document.getElementById("resultContainer");

let currentAnswer = "";


movieBtn.addEventListener("click", () => {
    currentAnswer = "movie";

    const query = searchInput.value.trim();

    if (query) {
        searchMovie(query);
    } else {
        resultContainer.innerHTML = "<p>Please enter the title of the movie, or the name of the person you're looking for</p>";
    }
});

personBtn.addEventListener("click", () => {
    currentAnswer = "person";

    const query = searchInput.value.trim();

    if (query) {
        searchPerson(query);
    } else {
        resultContainer.innerHTML = "<p>Please enter the title of the movie, or the name of the person you're looking for</p>";
    }
});

let currentMovies = [];
let currentPersons = [];

const sortingSelect = document.getElementById("sorting");

sortingSelect.addEventListener("change", () => {
    const selectedSort = sortSelect.value;

    if (currentAnswer === "movie") {
        sortedMovies(selectedSort);
    } else if (currentAnswer === "person") {
        sortPersons(selectedSort);
    }
});


// let currentMovies = [];
// let currentPersons = [];

// const sortMovie = document.getElementById("sorting");

// sortMovie.addEventListener("change", () => {
//     const selectedSort = sortMovie.value;

//     if(currentAnswer === "movie") {
//         sortedMovies(selectedSort);
//     } else if (currentAnswer === "person") {
//         sortPersons(selectedSort);
//     }
// });

// const sortPerson = document.getElementById("sorting");

// sortPerson.addEventListener("change", () => {
//     const selectedSortP = sortPerson.value;
//     sortPersons(selectedSortP);
// });


function searchMovie(query){
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(movieUrl)
        .then(res => res.json())
        .then(data => {
            currentMovies = data.results;
            displayMovieResult(data.results);
        })
    .catch(err => {
        console.error("There is an issue with the movie URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });
}

function searchPerson(query) {
    const personUrl = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    fetch(personUrl)
        .then(res => res.json())
        .then(data => {
            currentPersons = data.results;
            displayPersonResult(data.results);
        })
    .catch(err => {
        console.error("There is an issue with the person URL, or a problem with your network connection", err);
        resultContainer.innerHTML = `<p>An error has occurred when tying to find this person. Our best minds are working to resolve the issue as soon as possible. Thank you for your patience, please try again later.</p>`;
    });
}

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


function displayPersonResult(persons) {

    resultContainer.innerHTML = "";

    if (persons.length === 0) {
        resultContainer.innerHTML = `<p>I couldn't find anyone with that name. Please check the spelling, or try another name.</p>`;

        return;
    }

    persons.forEach(person => {
        const personCard = document.createElement("div");
        personCard.classList.add("searchPersonCard");

        const knownForList = person.known_for.map(item => {
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


function sortedMovies(selection) {
    let sorted = [...currentMovies];

    if (selection === "A-Z") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selection === "Z-A") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selection === "risingRate") {
        sorted.sort((a, b) => b.vote_average - a.vote_average);
    } else if (selection === "fallingRate") {
        sorted.sort((a, b) => a.vote_average - b.vote_average);
    }

    displayMovieResult(sorted);
}

function sortPersons(selection) {
    let sorted = [...currentPersons];

    if (selection === "A-Z") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selection === "Z-A") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selection === "risingRate") {
        sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (selection === "fallingRate") {
        sorted.sort((a, b) => a.popularity - b.popularity);
    }

    displayPersonResult(sorted);

}



// kej...
// det som ska hända nu är att jag måste få search och sort
// funktionerna att faktiskt fungera... 
// var för sig funkar dom iallafall... 

// samt lägga till modulerna... 
// fucking sheit man


