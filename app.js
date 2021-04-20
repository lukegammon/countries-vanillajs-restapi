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
    const modal = document.querySelector(".modal");
    const modalBackbtn = document.querySelector(".modal__backbtn");
    const modalBackbtnArrow = document.querySelector(".modal__backbtn img");
    const modalBorderbtn = document.querySelectorAll(".border-btn");
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
        modal.style.background = "hsl(209, 23%, 22%)";
        modal.style.color = "hsl(0, 0%, 100%)";
        modalBackbtn.style.color = "hsl(0, 0%, 100%)";
        modalBackbtn.style.background = "rgb(43, 57, 69)";
        modalBackbtn.style.boxShadow = "1px 1px 5px black";
        modalBackbtnArrow.src = "./img/arrow-back-outline-darkmode.svg";
        cards.forEach(card => {
            card.style.background = "hsl(209, 23%, 22%)";
            card.style.color = "hsl(0, 0%, 100%)";
            card.style.boxShadow = "1px 1px 5px black";
        });
        modalBorderbtn.forEach(button => {
            button.style.background = "hsl(209, 23%, 22%)";
            button.style.color = "hsl(0, 0%, 100%)";
            button.style.boxShadow = "1px 1px 5px black";
        })
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
        modal.style.background = "hsl(0, 0%, 100%)";
        modal.style.color = "hsl(200, 15%, 8%)"
        modalBackbtn.style.color = "hsl(200, 15%, 8%)"
        modalBackbtn.style.background = "hsl(0, 0%, 100%)";
        modalBackbtn.style.boxShadow = "1px 1px 5px lightgrey";
        modalBackbtnArrow.src = "./img/arrow-back-outline.svg";
        cards.forEach(card => {
            card.style.background = "hsl(0, 0%, 100%)";
            card.style.color = "hsl(200, 15%, 8%)";
            card.style.boxShadow = "1px 1px 5px lightgray";
        });
        console.log(modalBorderbtn);
        modalBorderbtn.forEach(button => {          
            button.style.background = "hsl(0, 0%, 100%)";
            button.style.color = "hsl(200, 15%, 8%)";
            button.style.boxShadow = "1px 1px 5px lightgray";
        })
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
            country = card.lastElementChild.firstElementChild.innerHTML;
            openModal(country);
        })
    })
}

function openModal(country) {
    const modal = document.querySelector(".modal");
    const body = document.querySelector("body");
    const backButton = document.querySelector(".modal__backbtn");
    backButton.addEventListener("click", () => {
        modal.style.display = "none";
        body.style.position = "static";
    });
    setModalData(country, modal);
    modal.style.display = "flex";
    body.style.position = "fixed";
}

async function setModalData(country, modal) {
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    const countryData = await response.json();
    console.log(countryData);
    console.log(modal);
    //Collect and display data in modal
    const flag = countryData[0].flag;
    const name = countryData[0].name;
    const nativeName = countryData[0].nativeName;
    const population = countryData[0].population.toLocaleString();
    const region = countryData[0].region;
    const subRegion = countryData[0].subregion;
    const capital = countryData[0].capital;
    const topLevelDomain = countryData[0].topLevelDomain[0];
    const currencies = countryData[0].currencies;
    const languages = countryData[0].languages;
    const borderCountries = countryData[0].borders;
    console.log(flag, nativeName, population, region, subRegion, capital, topLevelDomain, currencies, languages, borderCountries);
    const modalFlag = document.querySelector(".modal__flag");
    const modalName = document.querySelector(".modal__info-name");
    const modalNativeName = document.querySelector(".modal__info-main-native");
    const modalPopulation = document.querySelector(".modal__info-main-population");
    const modalRegion = document.querySelector(".modal__info-main-region");
    const modalSubRegion = document.querySelector(".modal__info-main-subregion");
    const modalCapital = document.querySelector(".modal__info-main-capital");
    const modalTopLevelDomain = document.querySelector(".modal__info-main-domain");
    const modalCurrencies = document.querySelector(".modal__info-main-currencies");
    const modalLanguages = document.querySelector(".modal__info-main-languages");
    const modalBorderCountries = document.querySelector(".modal__info-bordercountries");
    modalFlag.src = countryData[0].flag;
    modalName.innerHTML = countryData[0].name;
    modalNativeName.innerHTML = `Native Name: <span>${countryData[0].nativeName}</span>`;
    modalPopulation.innerHTML = `Population: <span>${countryData[0].population.toLocaleString()}</span>`;
    modalRegion.innerHTML = `Region: <span>${countryData[0].region}</span>`;
    modalSubRegion.innerHTML = `Sub Region: <span>${countryData[0].subregion}</span>`;
    modalCapital.innerHTML = `Capital: <span>${countryData[0].capital}</span>`;
    modalTopLevelDomain.innerHTML = `Top Level Domain: <span>${countryData[0].topLevelDomain[0]}</span>`;
    modalCurrencies.innerHTML = `Currencies: `;
    console.log(modalCurrencies.innerHTML.length);
    currencies.forEach(currency => {
        if(modalCurrencies.innerHTML.length === 12) {
            modalCurrencies.innerHTML += `<span>${currency.name}</span>`;
        } else {
            modalCurrencies.innerHTML += `, <span>${currency.name}</span>`;
        }
    });
    languages.forEach(language => {
        if(modalLanguages.innerHTML.length === 11) {
            modalLanguages.innerHTML += `<span>${language.name}`;
        } else {
            modalLanguages.innerHTML += `, <span>${language.name}`;
        }
    });
    if(borderCountries.length != 0) {
        modalBorderCountries.innerHTML = `<p>Border Countries:</p>`;
        borderCountries.forEach(country => {
        getCountryNameFromId(country);    
        });
    } else {
        modalBorderCountries.innerHTML = `<p>Border Countries:</p>`;
    }

    async function getCountryNameFromId(country) {
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
        const countryName = await response.json();
        return modalBorderCountries.innerHTML += `<button class="border-btn">${countryName.name}</button>`
    }
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

