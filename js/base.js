export const elements = {
    docTitle: document.querySelector('title'),
    modeParent: document.querySelector('.icon'),
    countriesParent: document.querySelector('.countries .container .row'),
    searchBtn: document.getElementById('search_btn'),
    serchInput: document.getElementById('search_input'),
    filterBtn: document.querySelector('.filter-btn'),
    fileteOptions: document.getElementById('filterOptions'),
    countryDetails: document.querySelector('.country-details'),
    backBtn: document.querySelector('.back')

}

const formatNumber =  num => {
    num = num.toString();
    const len = num.length;
    if (len >= 10){
        return `${num.slice(0, len - 9)},${num.slice(len - 9, len - 6)},${num.slice(len - 6, len - 3)},${num.slice(len - 3, len)}`;
    }else if (len >= 7){
        return `${num.slice(0, len - 6)},${num.slice(len - 6, len - 3)},${num.slice(len - 3, len)}`;
    }else if (len >= 4) {
        return `${num.slice(0, len - 3)},${num.slice(len - 3, len)}`;
    }
}

const formatCurs = curs => {
    let res;
    curs.forEach((cur, i) => {
        if (i < curs.length - 1) {
            res = `${cur.name}, `;
        }else {
            res = cur.name;
        }

        document.querySelector('.cur').append(res);
    });
}

const formatLangs = langs => {
    let res;
    langs.forEach((lang, i) => {
        if (i < langs.length - 1) {
            res = `${lang.name}, `;
        }else {
            res = lang.name;
        }

        document.querySelector('.lang').append(res);
    } );
}

export const renderCountries = country => {
    const html = `
        <a class="country" href="../countriesApp/detail.html#${country.alpha3Code}">
            <div class="country-flag" 
            style="background: url('${country.flag}') no-repeat;
            background-size:cover; background-position: center">
                
            </div>
            <div class="country-info">
                <p>${country.name}</p>
                <p><span>Population:</span> ${formatNumber(country.population)}</p>
                <p><span>Region:</span> ${country.region}</p>
                <p><span>Capital:</span> ${country.capital || 'No Capital Yet'}</p>
            </div>
        </a>
    `;

    elements.countriesParent.insertAdjacentHTML('beforeend', html);
}

export const renderDetails = details => {
    const html = `
        <div class="flag">
            <img src="${details.flag}">
        </div>

        <div class="detail-content">
            <h2>${details.name}</h2>
            <div class="country-detail">
                <div class="left">
                    <p><span>Native Name:</span> ${details.nativeName}</p>
                    <p><span>Population:</span> ${formatNumber(details.population)}</p>
                    <p><span>Region:</span> ${details.region ||'No Region Yet'}</p>
                    <p><span>Sub Region:</span> ${details.subregion || 'No Sub Region Yet'}</p>
                    <p><span>Capital:</span> ${details.capital || 'No Capital Yet'}</p>
                </div>
                <div class="right">
                    <p><span>Top Level Domain:</span> ${details.topLevelDomain}</p>
                    <p class="cur"><span>Currencies: </span></p>
                    <p class="lang"><span>Languages: </span></p>
                </div>
            </div>

            <div class="country-borders">
                <p>Border Countries: </p>
            </div>
        </div>
    `;

    elements.countryDetails.insertAdjacentHTML("beforeend", html);

    if (details.borders.length == 0) {
        const html = '&nbsp; No Borders Yet';
        document.querySelector('.country-borders').insertAdjacentHTML('beforeend', html);
    }else {
        details.borders.forEach((border, i) => {
            if (i < 3) {
                const span = document.createElement('span');
                fetch(`https://restcountries.eu/rest/v2/alpha/${border}?fields=name`)
                .then(res => res.json())
                .then(country => {
                    if (country.name.includes('(')) {
                        const end = country.name.indexOf('(');
                        span.textContent = country.name.slice(0, end);
                    }else {
                        span.textContent = country.name;
                    }  
                })
                
                document.querySelector('.country-borders').appendChild(span);
            }
        });
    }

    // add country currecies to ui
    formatCurs(details.currencies);

    // add country languages to ui
    formatLangs(details.languages);
}
