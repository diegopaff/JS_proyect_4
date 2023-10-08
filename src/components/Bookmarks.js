import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js'

import renderJobList from './JobList.js'

const mouseEnterHandler = () => {

    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    //make job list visible
    jobListBookmarksEl.classList.add('job-list--visible');

    //render bookmarks job list
    renderJobList('bookmarks');

}

const mouseLeaveHandler = () => {
    jobListBookmarksEl.classList.remove('job-list--visible');
}

const clickHandler = (ev) => {
    
    //dont continue if the click its outside the button
    if(!ev.target.className.includes('bookmark')) return;

    // update state
    if(state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)){
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
    }else{
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    // presist data with LOCALSTORAGE
    window.localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));

    // update style in button
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

    //render search job list
    renderJobList();
} 

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);