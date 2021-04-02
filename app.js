const flow = document.querySelector(".flow");

async function fetchData(region) {
    const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
    const countries = await response.json();
    console.log(countries);
    countries.forEach(obj => {
        const flag = obj.flag;
        const name = obj.name;
        const population = Number(obj.population).toLocaleString();
        const region = obj.region;
        const capital = obj.capital;
        const countryData = setData(name, flag, population, region, capital);
        flow.innerHTML += countryData;
    })
}

function setData(name, flag, population, region, capital) {
    return `<div class="card">
    <img class="card__flag"src="${flag}" alt="${name} flag">
    <div class="card__info">
        <h2 class="card__info-name">${name}</h2>
        <p class="card__info-population">Population: <span>${population}</span></p>
        <p class="card__info-region">Region: <span>${region}</span></p>
        <p class="card__info-capital">Capital: <span>${capital}</span></p>
    </div>
</div>`
}

fetchData("asia");

