import { renderCountries } from './base.js'

export class Countries {
    constructor() {}
    async getResults() {
        const res = await fetch('https://restcountries.eu/rest/v2/all?number=20');
        const countries = await res.json();
        this.results = countries;
    }
}

const displayCountries = country => renderCountries(country);

export const renderRes = (countries) => {
    countries.slice(0, 24).forEach(country => displayCountries(country));
}