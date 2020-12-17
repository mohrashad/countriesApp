import { renderDetails } from '../base.js';

export class Detail {
    constructor(alphaCode) {
        this.alphaCode = alphaCode;
    }

    async getCountryData() {
        try {
            const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${this.alphaCode}`);
            const data = await res.json();
            this.countryData = data;
        }catch(err) {
            console.log(err);
        }
    }
}

export const getDetails = country => renderDetails(country);