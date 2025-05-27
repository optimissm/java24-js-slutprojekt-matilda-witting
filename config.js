
// på denna sidan vill jag hantera min API nyckel 
const API_KEY = "c89d3a028475fddd396b0b1fc5636c09";

/*
// test för att se om nyckeln funkar
// det gjorde den
// men behöver inte detta till programmet

const url = `https://api.themoviedb.org/3/movie/100?language=en-US&api_key=${API_KEY}`;

fetch(url)
    // när resultatet kommer, gör vi det till JS data jag kan jobba med
    .then((res) => res.json())
    // sen får jag tillgång till api datan som skickas tillbaka
    // och skriver ut den i konsol
    .then((json) => console.log(json))
    // är det några fel någonstans, så hamnar vi här
    .catch((err) => console.error("Error: " + err));
*/

export { API_KEY };
