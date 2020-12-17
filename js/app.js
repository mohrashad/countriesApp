import { Countries, renderRes } from './appView.js';
import { elements } from './base.js';
import Search from './modules/search.js';
import * as SearchView from './views/searchView.js';
import Filter from './modules/filter.js';
import * as FilterView from './views/filterView.js';

// the state of app
const state = {};

// countries controller
const controlCountries = async () => {
    try {
        // create instance from countries data
        state.countries = new Countries();

        // get countries data
        await state.countries.getResults();

        // add countries data to ui
        renderRes(state.countries.results);

    }catch(err) {
        console.log(err);
    }
};

// search controller
const controlSearch = async () => {
    const query = SearchView.getQuery();

    if (query) {

        // create the search results 
        state.search = new Search(query, state.countries);

        // prepare the ui for the results
        try {
            await state.search.getResponse();

            // clear countries container
            SearchView.clearCountries();

            // clear search input
            SearchView.clearQuery();

            // add the search results to ui
            SearchView.renderRes(state.search.searchRes);

        }catch(err) {
            console.log(err);
        }
    }
}

// filter controller
const controlFilter = () => {
    const param = FilterView.getParam();

    if (param) {

        // create the filter results
        state.filter = new Filter(param, state.countries);

        // prepare the ui for the results
        try {
            // get the filter results
            state.filter.getFilterRes();

            // clear countries container
            FilterView.clearCountries();

            // add filter results to ui
            FilterView.renderRes(state.filter.filterRes);

        }catch(err) {
            console.log(err);
        }
    }
};

// elements event handelrs
elements.searchBtn.addEventListener('click', () => {
    controlSearch();
});

document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        controlSearch();
    }
});

// filter optiond handler
elements.fileteOptions.addEventListener('change', () => {
    controlFilter();
});

// window loaded handler
window.addEventListener('load', () => {

    // load countries when document loaded
    controlCountries();

    // get dark mode style from local storage
    const localHomeDark = localStorage.getItem('home-dark');
    if (localHomeDark) {

        // add dark mode style to document when loaded
        elements.docTitle.insertAdjacentHTML('beforebegin', localHomeDark);

        // change light mode icon and text to dark mode
        document.querySelector('.icon i').className = 'fas fa-sun';
        document.querySelector('.icon span').textContent = 'Light Mode';
    }
});

// dark mode and light mode code
elements.modeParent.addEventListener('click', e => {
    const homeDarkLink = document.querySelector(`link[href*="home-dark"]`);
    const modeIcon = document.querySelector('.icon i');

    if (e.target.matches('.icon, .icon i')) {
        if (modeIcon.classList.contains('fa-moon')) {
            
            // change light mode icon and text to dark mode
            modeIcon.className = 'fas fa-sun';
            document.querySelector('.icon span').textContent = 'Light Mode';

            // add dark mode file to document
            if (!homeDarkLink) {
                const link = `<link rel="stylesheet" href="./css/darkmode/home-dark.css">`;

                // add dark mode style to local storage
                localStorage.setItem('home-dark', link);

                // get dark mode style from local storage and add it to document
                const homeDark = localStorage.getItem('home-dark');
                elements.docTitle.insertAdjacentHTML('beforebegin', homeDark);
            }

        }else {

            // change light mode icon and text to light mode
            modeIcon.className = 'far fa-moon';
            document.querySelector('.icon span').textContent = 'Dark Mode';

            // remove dark mode file from document
            const darkStyle = document.querySelector(`link[href*="home-dark"]`);
            document.querySelector('head').removeChild(darkStyle);

            // remove dark mode style from local storage
            localStorage.removeItem('home-dark');
        }
    }
});