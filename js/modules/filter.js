export default class Filter {
    constructor(param, countries) {
        this.param = param;
        this.countries = countries.results;
    }

    async getFilterRes() {
        try {
            const filteredCountries = this.countries.filter(country => {
                return country.region.toLowerCase().includes(this.param.toLowerCase());
            });
            this.filterRes = filteredCountries;
        }catch(err) {
            console.log(err);
        } 
    }
}