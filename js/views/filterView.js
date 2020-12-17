import { elements, renderCountries } from '../base.js';

export const getParam = () => elements.fileteOptions.value;

export const clearCountries = () => elements.countriesParent.innerHTML = '';

const renderFilterRes = country => renderCountries(country);

export const renderRes = countries => {
    countries.slice(0, 24).forEach(country => renderFilterRes(country));
}