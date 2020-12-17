export default class Search {
    constructor(query, countries) {
        this.query = query;
        this.countries = countries.results;
    }

    async getResponse() {
        try {
            const filteredCountry = this.countries.filter(country => {
                return country.name.toLowerCase().includes(this.query.toLowerCase());
            });
            this.searchRes = filteredCountry;
        }catch(err) {
            console.log(err);
        } 
    }
}