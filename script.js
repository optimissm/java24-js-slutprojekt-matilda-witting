
// först behöver jag min API nyckel och URL
// nyckeln hittar vi i config.js
// och detta är min url till topp 10 högst rankade filmerna
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;

// hämtar från vår HTML så vi kan lägga till funktioner
const rateButton = document.getElementById("topButton");
const rateContainer = document.getElementById("topContainer");



// vid klick så laddas filmerna från urlen
rateButton.addEventListener("click", () => {
  // när man klickar händer det som står här i
  // så vi använder fetch och res grejen
  fetch(topRatedUrl)
    .then(res => res.json())
    .then(data => {
      // skapar en lista med de 0-10 högst rankade filmerna
      const rateMovies = data.results.slice(0, 10);
      // rensar diven, så vi inte får filmer på varandra om igen
      rateContainer.innerHTML = "";

      rateMovies.forEach(movie => {

        rateContainer.appendChild(createMovieCard(movie));

      });

    })
    .catch(err => {
      console.error("I''m sorry, but I couldn't find the list right now...", err);

    });

});

// är det då typ här jag gör populära filmdelen? 
const popUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;

const popButton = document.getElementById("popButton");
const popContainer = document.getElementById("popContainer");

popButton.addEventListener("click", () => {
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

    console.error("I'm not able to show you the most popular movies right now... Try agian later.")

  });

});





