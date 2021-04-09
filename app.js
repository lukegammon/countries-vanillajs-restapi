const flow = document.querySelector(".flow");

async function fetchData(region, name) {
    flow.innerHTML = "";
    if(region) {
        const response = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
        const countries = await response.json();
        displayCountries(countries);
    } else if(name) {
        try {
            const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
            const countries = await response.json();
                displayCountries(countries);
        } catch (err) {
            console.err(err);
        }
            
    } else {
        const response = await fetch('https://restcountries.eu/rest/v2/europe');
        const countries = await response.json();
        displayCountries(countries);
    }

    function displayCountries(countries) {
        countries.forEach(obj => {
            const flag = obj.flag;
            const name = obj.name;
            const population = Number(obj.population).toLocaleString();
            const region = obj.region;
            const capital = obj.capital;
            const countryData = setData(name, flag, population, region, capital);
            flow.innerHTML += countryData;
        });
    }
}

//Run first will all countries data
fetchData("europe", null);

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

// click event for dropdown region select

const dropdownMenu = document.querySelector(".search__dropdown");
const dropdownMenuExpanded = document.querySelector(".search__dropdown-options");
const dropdownMenuOptions = document.querySelectorAll(".search__dropdown-option");
dropdownMenu.addEventListener("click", () => {
    dropdownMenuExpanded.style.display === "flex" ?
    dropdownMenuExpanded.style.display = "none" :
    dropdownMenuExpanded.style.display = "flex";
});

dropdownMenuOptions.forEach(option => {
    option.addEventListener("click", (e) => {
        dropdownMenuExpanded.style.display = "none";
        const region = e.target.innerHTML;
        fetchData(region, null);
    });
})


const input = document.querySelector(".search__input");
input.addEventListener("input", () => { 
    flow.innerHTML = "";
    doSearch();
});

let delayTimer;

    function doSearch() {
        if (input.value === "" || input.value.length < 2) {
            return fetchData("europe", null);
        }
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function() {
            const inputValue = input.value;
            fetchData(null, inputValue);
        }, 500); // Will do the ajax stuff after 1000 ms
    }
