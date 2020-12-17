import { Detail, getDetails } from '../views/detailView.js';
import { elements } from '../base.js';

// the state of details
const state = {};

// details controller
const controlCountryDetail = async () => {
   try {
        // get the country alpha code
        const alphaCode = window.location.hash.slice(1, window.location.hash.length);

        // create instance from country details
        state.countryDetails = new Detail(alphaCode);

        // get country details
        await state.countryDetails.getCountryData();

        // add country data to ui
        getDetails(state.countryDetails.countryData);

   }catch(err) {
       console.log(err);
   }
};


// elements events handlers
window.addEventListener('load', () => {
    
    // add country details to ui when document loaded
    controlCountryDetail();

    // get the dark mode style from local storage
    const localDetailDark = localStorage.getItem('detail-dark');

    if (localDetailDark) {
        // add dark mode style to document
        elements.docTitle.insertAdjacentHTML('beforebegin', localDetailDark);

        // change light mode icon and text to dark mode
        document.querySelector('.icon i').className = 'fas fa-sun';
        document.querySelector('.icon span').textContent = 'Light Mode';
    }
});

// dark mode and light mode code
elements.modeParent.addEventListener('click', e => {

    // get the dark mode file and mode icon
    const detailDarkLink = document.querySelector(`link[href*="detail-dark"]`);
    const modeIcon = document.querySelector('.icon i');

    if (e.target.matches('.icon, .icon i')) {
        if (modeIcon.classList.contains('fa-moon')) {
            
            // change light mode icon and text to dark mode
            modeIcon.className = 'fas fa-sun';
            document.querySelector('.icon span').textContent = 'Light Mode';

            // add dark mode file to document
            if (!detailDarkLink) {
                // create the dark mode style link
                const link = `<link rel="stylesheet" href="./css/darkmode/detail-dark.css">`;

                // add dark mode style to local storage
                localStorage.setItem('detail-dark', link);

                // get the dark mode file from local storage
                const detailDark = localStorage.getItem('detail-dark');

                // add dark mode style to document
                elements.docTitle.insertAdjacentHTML('beforebegin', detailDark);
            }

        }else {

            // change light mode icon and text to light mode
            modeIcon.className = 'far fa-moon';
            document.querySelector('.icon span').textContent = 'Dark Mode';

            // remove dark mode file from document
            document.querySelector('head').removeChild(detailDarkLink);

            // remove the dark mode style from local storage
            localStorage.removeItem('detail-dark');
        }
    }
});
