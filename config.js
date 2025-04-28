
// på denna sidan vill jag ha min nyckel och vart den går typ
const API_KEY = "c89d3a028475fddd396b0b1fc5636c09";
const url = `https://api.themoviedb.org/3/movie/100?language=en-US&api_key=${API_KEY}`;

// dags att anropa mitt API från url:en ^
fetch(url)
    // när resultatet kommer, gör vi det till JS data jag kan jobba med
    .then((res) => res.json())
    // sen får jag tillgång till api datan som skickas tillbaka
    // och skriver ut den i konsol
    .then((json) => console.log(json))
    // är det några fel någonstans, så hamnar vi här
    .catch((err) => console.error("error: " + err));


