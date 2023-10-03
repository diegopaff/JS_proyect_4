import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js'

import renderJobList from './JobList.js';

const clickHandler = (ev) => {

    //get clicked element
    const clickedButtonEL = event.target.closest('.sorting__button');

    //stop function if no clicked button
    if (!clickedButtonEL) return;

    // check if is recent or relevant
    const recent = clickedButtonEL.className.includes('--recent') ? true : false;

    if(recent){
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }
    //sort job items
    if(recent){
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a,b) => {
            return b.relevanceScore - a.relevanceScore;  
        });
    }


    renderJobList();
}
sortingEl.addEventListener('click', clickHandler);