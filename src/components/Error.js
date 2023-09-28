import {
    errorEl,
    errorTextEl
} from '../common.js'

const renderError = (message = 'Error in input') => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(()=> {
        errorEl.classList.remove('error--visible');
    },3500);
}

export default renderError;