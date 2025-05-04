
// först behöver jag min API nyckel och URL
// nyckeln hittar vi i config.js
// och detta är min url till topp 10 högst rankade filmerna
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;

// hämtar från vår HTML så vi kan lägga till funktioner
const rateButton = document.getElementById("topButton");
const rateContainer = document.getElementById("topContainer");

let showTop = false;

// vid klick så laddas filmerna från urlen
rateButton.addEventListener("click", () => {

  // lägger till så att man kan stänga listan med filmer också
  if (showTop) {

    rateContainer.innerHTML = "";
    showTop = false;

  } else {
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

        showTop = true;  

      })
      .catch(err => {
        console.error("I''m sorry, but I couldn't find the list right now...", err);

      });
  }

});

// Så vill jag basically göra samma sak för populära filmer då också
// så vi behöver byta URL 
const popUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;

const popButton = document.getElementById("popButton");
const popContainer = document.getElementById("popContainer");

let showPop = false;

popButton.addEventListener("click", () => {

  if (showPop) {

    popContainer.innerHTML = "";
    showPop = false;

  } else {
    fetch(popUrl)
      .then(res => res.json())
      .then(data => {

        const popMovies = data.results.slice(0, 10);
        popContainer.innerHTML = "";

        popMovies.forEach(movie => {

          popContainer.appendChild(createMovieCard(movie));

        });

        showPop = true;

      }) 

    .catch(err => {
    console.error("I'm not able to show you the most popular movies right now... Try agian later.")

    });

  }

});





