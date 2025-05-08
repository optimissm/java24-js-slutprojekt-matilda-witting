
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;

const rateContainer = document.getElementById("topContainer");

fetch(topRatedUrl)
  .then(res => res.json())
  .then(data => {
    const rateMovies = data.results.slice(0, 10);
    rateContainer.innerHTML = "";

    rateMovies.forEach(movie => {
      rateContainer.appendChild(createMovieCard(movie));
    });
  })
  .catch(err => {
    console.error("I'm sorry, but I can't find the list of top 10 highest rated movies right now... Please try again later.", err);
  });

