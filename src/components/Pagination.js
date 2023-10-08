import {
    state,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    RESULTS_PER_PAGE
} from '../common.js'

import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    //show and hide buttons in limits
    state.currentPage > 1 ? 
        paginationBtnBackEl.classList.remove('pagination__button--hidden') : 
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    
    state.currentPage > Math.trunc(state.searchJobItems.length / RESULTS_PER_PAGE) ? 
        paginationBtnNextEl.classList.add('pagination__button--hidden') : 
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
        
    //change buttons number
    paginationNumberBackEl.textContent = state.currentPage - 1;
    paginationNumberNextEl.textContent = state.currentPage + 1;

    // unfocus (blur) buttons
    paginationBtnBackEl.blur();
    paginationBtnNextEl.blur();
}

const clickHandler = (ev) => {
    //get the clicked element
    const clickedButtonEL = ev.target.closest('.pagination__button');
    //if no click then exits the function
    if(!clickedButtonEL) return;

    // check if the intention is to go to next page
    const nextPage = clickedButtonEL.className.includes('--next') ? true : false;

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;
    
    // render pagination buttons
    renderPaginationButtons();

    // render job items for that page
    renderJobList();

}   

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;