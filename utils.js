
// lägga till ett movie card
function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieInfo");

    movieCard.innerHTML = `
    <h3>${movie.title}</h3>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Score:</strong> ${movie.vote_average}</p>
    `;

    return movieCard;
}

