
// lägga till ett movie card som funkar till både topp 10 och populära
function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieInfo");

    movieCard.innerHTML = `
    <h3>${movie.title}</h3>
    <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Score:</strong> ${movie.vote_average}</p>
    <div class="divider"></div>
    `;

    return movieCard;
}

