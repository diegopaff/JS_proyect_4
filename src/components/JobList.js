import {
    RESULTS_PER_PAGE,
    BASE_URL_API,
    jobListSearchEl,
    jobDetailsContentEl,
    getData,
    state
} from '../common.js'

import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';
import renderError from './Error.js';


const renderJobList = () => {

    //remove previous job items
    jobListSearchEl.innerHTML = '';


    //render job items
    state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach((job) =>{
        const newJobItemHTML = `
            <li class="job-item">
                <a class="job-item__link" href="${job.id}">
                <div class="job-item__badge">${job.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${job.title}</h3>
                    <p class="job-item__company">${job.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${job.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${job.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${job.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                    <time class="job-item__time">${job.daysAgo}d</time>
                </div>
                </a>
            </li>
        `;
        
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
}

const clickHandler = async (ev) => {
    //prevent anchor default navigation
    ev.preventDefault();

    const jobItemEl = ev.target.closest('.job-item');
    
    //remove previous element active class
    // first I check that an element with this class exists
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    //add active class 
    jobItemEl.classList.add('job-item--active');

    //empty the content in the job details
    jobDetailsContentEl.innerHTML = '';

    // make the loader spinner visible
    renderSpinner('job-details');

    // get the id 
    const id = jobItemEl.children[0].getAttribute('href');

    
    try { 
        // fetch job item  data
        const data = await getData(`${BASE_URL_API}/jobs/${id}`);
        const { jobItem } = data;

        // render the details using JobDetails component
        renderJobDetails(jobItem);
        
    } catch (error){
        renderError(error.message);
        renderSpinner('job-details');
    }

}

jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;