import {
    jobDetailsContentEl,
    BASE_URL_API,
    getData,
    state
}from '../common.js'

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

const loadHashChangeHanlder = async () => {
   //get the id from the url 
   const id = window.location.hash.substring(1);
   
   if(id){

    //remove previous element active class
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
   

    //remove previous details content
    jobDetailsContentEl.innerHTML = '';

    //add spinner
    renderSpinner('job-details');

    try {

        // fetch job item  data
        const data = await getData(`${BASE_URL_API}/jobs/${id}`);
        const { jobItem } = data;

        // update state: activeJobItem
        state.activeJobItem = jobItem;

        //render search job list
        renderJobList();
        
        // render the details using JobDetails component
        renderJobDetails(jobItem);
        
    } catch (error){
        renderError(error.message);
        renderSpinner('job-details');
    }
   }
}

window.addEventListener('DOMContentLoaded', loadHashChangeHanlder);
window.addEventListener('hashchange', loadHashChangeHanlder);
