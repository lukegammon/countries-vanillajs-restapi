// dark mode toggle
const darkmodeToggle = document.querySelector(".nav__toggle");
let lightMode = true;

darkmodeToggle.addEventListener("click", () => {
    if(lightMode) {
        setViewMode("dark");
        lightMode = false;
    } else {
        setViewMode("light");
        lightMode = true;
    }
});


function setViewMode(viewMode) {
    const cards = document.querySelectorAll(".card");
    const background = document.querySelector("body");
    const title = document.querySelector(".nav__logo");
    const navModeText = document.querySelector(".nav__toggle-text");
    const navBackground = document.querySelector(".nav");
    const searchBox = document.querySelector(".search__input");
    const searchDropdown = document.querySelector(".search__dropdown");
    const searchDropdownOptions = document.querySelector(".search__dropdown-options");
    if(viewMode === "dark") {
        background.style.background = "hsl(207, 26%, 17%)";
        title.style.color = "hsl(0, 0%, 100%)";
        navBackground.style.background = "hsl(209, 23%, 22%)";
        navBackground.style.boxShadow = "1px 1px 5px black";
        navModeText.innerHTML = "Light Mode";
        searchBox.style.boxShadow = "1px 1px 5px black";
        searchBox.style.background = "hsl(209, 23%, 22%)";
        searchBox.style.color = "hsl(0, 0%, 100%)";
        searchDropdown.style.boxShadow = "1px 1px 5px black";
        searchDropdown.style.background = "hsl(209, 23%, 22%)";
        searchDropdown.style.color = "hsl(0, 0%, 100%)";
        searchDropdown.lastChild.src = "./img/chevron-down-outline-darkmode.svg";
        searchDropdownOptions.style.boxShadow = "1px 1px 5px black";
        searchDropdownOptions.style.background = "hsl(209, 23%, 22%)";
        searchDropdownOptions.style.color = "hsl(0, 0%, 100%)";
        
        cards.forEach(card => {
            card.style.background = "hsl(209, 23%, 22%)";
            card.style.color = "hsl(0, 0%, 100%)";
            card.style.boxShadow = "1px 1px 5px black";
        });
    } else {
        background.style.background = "hsl(0, 0%, 97%)";
        title.style.color = "hsl(200, 15%, 8%)";
        navBackground.style.background = "hsl(0, 0%, 97%)";
        navBackground.style.boxShadow = "1px 1px 5px lightgrey";
        navModeText.innerHTML = "Dark Mode";
        searchBox.style.boxShadow = "1px 1px 5px lightgrey";
        searchBox.style.background = "hsl(0, 0%, 100%)";
        searchBox.style.color = "hsl(200, 15%, 8%)";
        searchDropdown.style.boxShadow = "1px 1px 5px lightgrey";
        searchDropdown.style.background = "hsl(0, 0%, 100%)";
        searchDropdown.style.color = "hsl(200, 15%, 8%)"
        searchDropdown.lastChild.src = "./img/chevron-down-outline.svg";
        searchDropdownOptions.style.background = "hsl(0, 0%, 100%)";
        searchDropdownOptions.style.color = "hsl(200, 15%, 8%)"
        searchDropdownOptions.style.boxShadow = "1px 1px 5px lightgrey";
        cards.forEach(card => {
            card.style.background = "hsl(0, 0%, 100%)";
            card.style.color = "hsl(200, 15%, 8%)";
            card.style.boxShadow = "1px 1px 5px lightgray";
        });
    }
}

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
            console.error(err);
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
            if(lightMode) {
                setViewMode("light");
            } else {
                setViewMode("dark");
            }
        });
    }
    /* Make Cards Clickable */
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            openModal();
        })
    })
}

function openModal() {
    const modal = document.querySelector(".modal");
    const body = document.querySelector("body");
    modal.style.display = "block";
    body.style.position = "fixed";
    body.style.overflowY = "hidden";
}

//Run first will europe data
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
    let inputData = document.querySelector(".search__input");
    inputData.value = "";
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


let searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", () => { 
    flow.innerHTML = "";
    doSearch();
});

let delayTimer;

function doSearch() {
    if (searchInput.value === "" || searchInput.value.length < 2) {
        return fetchData("europe", null);
    }
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
        const inputValue = searchInput.value;
        fetchData(null, inputValue);
    }, 500); // Will do the ajax stuff after 500 ms
};


// DISABLE BODY SCROLL ON MODAL OPEN
// ADD DARK MODE / LIGHT MODE TO MODAL ON OPEN

