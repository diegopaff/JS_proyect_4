import { 
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_URL_API,
    getData,
    state

} from '../common.js'

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';

// --- Search component ------------------------------------
const submitHandler = async (ev) => {
    //prevent default
    ev.preventDefault();

    //get searchText
    const searchText = searchInputEl.value;

    //validation (regular expresions)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch){
        renderError("Your search may not contain numbers");
        return;
    }
    
    //blur input
    searchInputEl.blur();

    //remove previous job items
    jobListSearchEl.innerHTML = '';

    //load spinner when submit request
    renderSpinner('search');

    try {
        //fetch search results
        const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);
    
        const { jobItems } = data; // array of jobs

        //update state
        state.searchJobItems = jobItems;

        //remove loader spinner
        renderSpinner('search');
    
        //cantidad de resultados
        numberEl.textContent = jobItems.length;
    
        //render elements in list
        renderJobList();

    } catch (error){
        renderError(error.message);
        renderSpinner('search');
    }
    

};
searchFormEl.addEventListener('submit', submitHandler);