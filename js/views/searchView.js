import { elements, renderCountries } from '../base.js';

export const getQuery = () => elements.serchInput.value;
export const clearQuery = () => elements.serchInput.value = '';
export const clearCountries = () => elements.countriesParent.innerHTML = '';

const renderSearchRes = country => renderCountries(country);

export const renderRes = countries => {
    countries.slice(0, 10).forEach(country => renderSearchRes(country));
}