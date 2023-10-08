import { 
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_URL_API,
    getData,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state

} from '../common.js'

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js'

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

    //update sorting buttons styles
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    try {
        //fetch search results
        const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);
    
        const { jobItems } = data; // array of jobs

        //update state
        state.searchJobItems = jobItems;

        // reset pagination to 1 when sorting change
        state.currentPage = 1;
        renderPaginationButtons();

        //remove loader spinner
        renderSpinner('search');
    
        //quantity of elements
        numberEl.textContent = jobItems.length;
    
        //render elements in list
        renderJobList();

    } catch (error){
        renderError(error.message);
        renderSpinner('search');
    }
    

};
searchFormEl.addEventListener('submit', submitHandler);