
const popUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;

// console.log(API_KEY)


fetch(popUrl)
    .then(res => res.json())
    .then(data => {
        const popMovies = data.results.slice(0, 10);
        popContainer.innerHTML = "";

        popMovies.forEach(movie => {
            popContainer.appendChild(createMovieCard(movie));

        });
    })
    .catch(err => {
        console.error("I'm not able to show you the list of the 10 most popular movies right now... Please try agian later.")

    });


