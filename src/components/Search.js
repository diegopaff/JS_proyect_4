import { 
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl
} from '../common.js'

import renderError from './Error.js';
import renderSpinner from './Spinner.js';

// --- Search component ------------------------------------
const submitHandler = (ev) => {
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

    //fetch search results
    const fetchJobsList = async () => {
        try{
            const res = await fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`);
            const data = await res.json();

            const { jobItems } = data; // array of jobs
        
            //remove loader spinner
            renderSpinner('search');

            //cantidad de resultados
            numberEl.textContent = jobItems.length;

            //render elementes in list
            jobItems.slice(0,7).forEach((job) =>{
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

            // si hay algun problema con el fetch a al url
            if(!res.ok){
                console.log('Error en el fetch');
                return;
            }  
        }
        catch(error){
            console.log(error)
        }

   } 
   fetchJobsList(); 

}
searchFormEl.addEventListener('submit', submitHandler);