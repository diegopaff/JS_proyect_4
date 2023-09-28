import {
    spinnerSearchEl,
    spinnerJobDetailsEl
}from '../common.js';

const renderSpinner = (wichSpinner) => {
   const spinnerEl = wichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
   spinnerEl.classList.toggle('spinner--visible');

}

export default renderSpinner;